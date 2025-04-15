import {loadPromptFromFile} from "../utils/prompt-utils.js"; // Use .js extension for ESM imports

// Load the prompt content when the module is initialized
const agentRulesPromptContent = await loadPromptFromFile(
  import.meta.url,
  "./agent-rules-prompt.md"
);

export const createTestRulesPrompt = (): string => agentRulesPromptContent;
