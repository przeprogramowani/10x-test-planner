import path from "path";
import {CliOptions} from "../cli/options.js";

export interface OutputPaths {
  testPlan: string;
  projectChecklist: string;
  agentRules: string;
}

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
export function getOutputPaths(options: CliOptions): OutputPaths {
  const basePath = normalizePath(options.outDir);
  return {
    testPlan: path.join(basePath, "test-plan.md"),
    projectChecklist: path.join(basePath, "project-checklist.md"),
    agentRules: path.join(basePath, "agent-rules.md"),
  };
}
