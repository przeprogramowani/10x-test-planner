import fs from "fs/promises";
import {createTestRulesPrompt} from "./agent-rules-prompt.js";

/**
 * Generates agent rules and saves them to a file
 * @param outputPath The path where agent rules should be saved
 * @returns The agent rules content
 */
export async function generateAgentRules(outputPath: string): Promise<string> {
  console.log("📝 Generating agent rules...");

  const agentRules = createTestRulesPrompt();

  // Store the rules to the specified file
  await fs.writeFile(outputPath, agentRules);

  return agentRules;
}
