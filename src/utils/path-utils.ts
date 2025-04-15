import path from "path";
import {CliOptions} from "../cli/options.js";

/**
 * Normalizes a file path to an absolute path
 * @param filePath Relative or absolute file path
 * @returns Absolute file path
 */
export function normalizePath(filePath: string): string {
  return path.resolve(process.cwd(), filePath);
}

/**
 * Determines the output path for the test plan based on CLI options
 * @param options CLI options
 * @returns Absolute path for the output file
 */
export function getOutputPath(options: CliOptions): string {
  if (options.outFile) {
    return normalizePath(options.outFile);
  }
  return path.join(normalizePath(options.outDir), "test-plan.md");
}
