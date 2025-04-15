import {readFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

/**
 * Loads prompt content from a markdown file relative to the calling module.
 * @param callerImportMetaUrl - Pass `import.meta.url` from the calling module.
 * @param relativeFilePath - The path to the markdown file, relative to the calling module's directory.
 * @returns The content of the file as a string, or an error message if loading fails.
 */
export async function loadPromptFromFile(
  callerImportMetaUrl: string,
  relativeFilePath: string
): Promise<string> {
  try {
    const __filename = fileURLToPath(callerImportMetaUrl);
    const __dirname = path.dirname(__filename);
    const absolutePath = path.resolve(__dirname, relativeFilePath);
    const content = await readFile(absolutePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Failed to read prompt file at ${relativeFilePath}:`, error);
    const fileName = path.basename(relativeFilePath);
    return `Error: Could not load prompt from ${fileName}. Please check the file exists and is readable.`;
  }
}
