import {GoogleGenAI, File, FileData} from "@google/genai";
import {getCachedVideo, cacheVideo} from "./video-cache";

// Add FileState enum to match Gemini's file states
enum FileState {
  PROCESSING = "PROCESSING",
  ACTIVE = "ACTIVE",
  FAILED = "FAILED",
}

function getCommonMimeType(fileName: string) {
  const extension = fileName.split(".").pop();
  switch (extension) {
    case "mov":
      return "video/mov";
    case "mp4":
      return "video/mp4";
    case "avi":
      return "video/avi";
    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }
}

export function getFileData(file: File): FileData {
  return {
    fileUri: file.uri,
    mimeType: file.mimeType,
  };
}

/**
 * Uploads a video to Gemini, using cache if available
 * @param googleGenAi GoogleGenAI instance
 * @param pathToVideo Path to the video file
 */
export async function uploadVideoWithCache(
  googleGenAi: GoogleGenAI,
  pathToVideo: string
): Promise<FileData> {
  // Try to get from cache first
  const cachedMetadata = await getCachedVideo(pathToVideo);
  if (cachedMetadata) {
    console.log("✨ Video found in cache - processing...");
    return getFileData(cachedMetadata);
  }

  // If not in cache, upload and cache the result
  const metadata = await uploadVideo(googleGenAi, pathToVideo);
  await cacheVideo(pathToVideo, metadata);
  return getFileData(metadata);
}

/**
 * Uploads a video to Gemini directly without caching
 * @param googleGenAi GoogleGenAI instance
 * @param pathToVideo Path to the video file
 */
async function uploadVideo(
  googleGenAi: GoogleGenAI,
  pathToVideo: string
): Promise<FileData> {
  let file = await googleGenAi.files.upload({
    file: pathToVideo,
    config: {
      mimeType: getCommonMimeType(pathToVideo),
    },
  });

  if (!file.name) {
    throw new Error("Failed to get file name from upload response");
  }

  const fileName = file.name; // Store the name to help TypeScript track the type

  console.log("Processing uploaded video...");
  while (file.state === FileState.PROCESSING) {
    process.stdout.write(".");
    // Sleep for 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5_000));
    // Fetch the file status
    file = await googleGenAi.files.get({name: fileName});
  }

  if (file.state === FileState.FAILED) {
    throw new Error("Video processing failed.");
  }

  console.log(`\nFile ${file.name} is ready for inference as ${file.uri}`);
  return file;
}
