import fs from "fs/promises";
import path from "path";
import {exec} from "child_process";
import {promisify} from "util";

const execPromise = promisify(exec);

/**
 * Interface for the result of video optimization
 */
export interface OptimizedVideo {
  originalPath: string;
  optimizedPath: string;
  fps: number;
}

/**
 * Optimizes a video file using ffmpeg, creating a new file with the specified FPS
 * @param videoPath Path to the video file to optimize
 * @param fps Frames per second to use for the optimized video (default: 15)
 * @returns Promise resolving to an OptimizedVideo object with paths and metadata
 */
export async function optimizeVideo(
  videoPath: string,
  fps: number = 15
): Promise<OptimizedVideo> {
  // Check if ffmpeg is installed
  try {
    await execPromise("ffmpeg -version");
  } catch (error) {
    throw new Error(
      "❌ ffmpeg is not installed. Please install ffmpeg to use the optimize feature."
    );
  }

  // Verify input file exists
  try {
    await fs.access(videoPath);
  } catch (error) {
    throw new Error(`Input video file not found: ${videoPath}`);
  }

  // Generate output path with fps in filename
  const parsedPath = path.parse(videoPath);
  const optimizedFilename = `${parsedPath.name}_${fps}fps${parsedPath.ext}`;
  const optimizedPath = path.join(parsedPath.dir, optimizedFilename);

  // Check if optimized file already exists
  try {
    await fs.access(optimizedPath);
    console.log(
      `ℹ️ Optimized file already exists: ${optimizedPath}. Skipping processing.`
    );
    return {
      originalPath: videoPath,
      optimizedPath,
      fps,
    };
  } catch (error) {
    // File doesn't exist, continue with optimization
  }

  console.log(`🔄 Optimizing video to ${fps} fps...`);

  // Run ffmpeg command to optimize the video
  try {
    await execPromise(
      `ffmpeg -i "${videoPath}" -r ${fps} -c:v libx264 -preset fast -crf 22 -c:a copy "${optimizedPath}"`
    );

    console.log(`✅ Video optimized successfully: ${optimizedPath}`);

    return {
      originalPath: videoPath,
      optimizedPath,
      fps,
    };
  } catch (error) {
    console.error("Error optimizing video:", error);
    throw new Error(`Failed to optimize video: ${(error as Error).message}`);
  }
}
