import fs from "fs/promises";
import {
  createAgentRulesPrompt,
  createProjectChecklistPrompt,
} from "./create-rules.js";

export async function generateAgentRules(
  projectChecklistPath: string,
  agentRulesPath: string
): Promise<string> {
  console.log("📝 Generating agent rules...");

  const agentRules = createAgentRulesPrompt();
  const projectChecklist = createProjectChecklistPrompt();

  await fs.writeFile(projectChecklistPath, projectChecklist);
  await fs.writeFile(agentRulesPath, agentRules);
  return agentRules;
}
