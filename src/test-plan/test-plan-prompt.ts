import {loadPromptFromFile} from "../utils/prompt-utils.js"; // Use .js extension for ESM imports

// Load the prompt content when the module is initialized
const testPlanPromptContent = await loadPromptFromFile(
  import.meta.url,
  "./test-plan-prompt.md"
);

export const createTestPlanPrompt = (): string => testPlanPromptContent;
