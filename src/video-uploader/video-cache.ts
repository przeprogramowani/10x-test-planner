import fs from "fs/promises";
import {File} from "@google/genai";
import path from "path";
import os from "os";

// Create a cache directory in the user's home directory
const CACHE_DIR = path.join(os.tmpdir(), ".test-planner");
const CACHE_FILE = path.join(CACHE_DIR, "video-cache.json");

type VideoCache = Record<string, File>;

/**
 * Ensures the cache directory exists
 */
async function ensureCacheDir(): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, {recursive: true});
  } catch (err) {
    // Ignore if directory already exists
  }
}

/**
 * Loads the cache from disk, or returns an empty object if not found.
 */
async function loadCache(): Promise<VideoCache> {
  await ensureCacheDir();
  try {
    const data = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return {};
    }
    throw err;
  }
}

/**
 * Saves the cache to disk.
 */
async function saveCache(cache: VideoCache): Promise<void> {
  await ensureCacheDir();
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
}

/**
 * Gets a cached File metadata for a video if it exists
 * @param pathToVideo Path to the video file
 * @returns The cached File metadata or null if not found
 */
export async function getCachedVideo(
  pathToVideo: string
): Promise<File | null> {
  const absPath = path.resolve(pathToVideo);
  const cache = await loadCache();
  return cache[absPath] || null;
}

/**
 * Stores video metadata in the cache
 * @param pathToVideo Path to the video file
 * @param metadata The File metadata to cache
 */
export async function cacheVideo(
  pathToVideo: string,
  metadata: File
): Promise<void> {
  const absPath = path.resolve(pathToVideo);
  const cache = await loadCache();
  cache[absPath] = metadata;
  await saveCache(cache);
}
