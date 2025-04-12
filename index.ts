import fs from "fs";
import {google} from "@ai-sdk/google";
import {generateText} from "ai";
import {tool} from "ai";
import {z} from "zod";
import dotenv from "dotenv";
dotenv.config();

import {createScenariosPrompt} from "./src/prompts.js";

const scenarios = `
1) sign in to application
2) navigation to collections
3) creating new collection
4) creating collection item
5) deleting collection item
`;

const scenarioName = "collection-editing";
const video = fs.readFileSync(`./src/data/${scenarioName}.mov`);
const mimeType = "video/mov";

const promptText = createScenariosPrompt();

console.log(`Sending prompt to Google AI...`);

try {
  const {text, steps} = await generateText({
    model: google("gemini-2.0-flash"),
    maxSteps: 10,
    toolChoice: "required",
    tools: {
      createPageObjectModelFile: tool({
        description: "Create a page object model file",
        parameters: z.object({
          fileName: z.string().describe("The name of the file to create"),
          fileContent: z.string().describe("The content of the file"),
        }),
        execute: async ({fileName, fileContent}) => {
          fs.writeFileSync(`./e2e/page-objects/${fileName}`, fileContent);
          console.log(
            `Page object model saved to ./e2e/page-objects/${fileName}`
          );
        },
      }),
      createTestSuiteFile: tool({
        description: "Create a test suite file",
        parameters: z.object({
          fileName: z.string().describe("The name of the file to create"),
          fileContent: z.string().describe("The content of the file"),
        }),
        execute: async ({fileName, fileContent}) => {
          fs.writeFileSync(`./e2e/tests/${fileName}`, fileContent);
          console.log(`Test suite saved to ./e2e/tests/${fileName}`);
        },
      }),
    },
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: promptText,
          },
          {
            type: "file",
            data: video,
            mimeType,
          },
        ],
      },
    ],
  });
} catch (error) {
  console.error(error);
}
