import {loadPromptFromFile} from "../utils/prompt-utils.js"; // Use .js extension for ESM imports

const projectChecklistPromptContent = await loadPromptFromFile(
  import.meta.url,
  "./prompt-project-checklist.md"
);

const agentRulesPromptContent = await loadPromptFromFile(
  import.meta.url,
  "./prompt-agent-rules.md"
);

export const createProjectChecklistPrompt = (): string =>
  projectChecklistPromptContent;

export const createAgentRulesPrompt = (): string => agentRulesPromptContent;
