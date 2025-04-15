import dotenv from "dotenv";
dotenv.config();

import {createGenAiClient} from "./src/genai-client/create-client";
import {uploadVideoWithCache} from "./src/video-uploader/video";
import {generateTestPlan} from "./src/test-plan/test-plan";

const googleGenAi = createGenAiClient();

const model = "gemini-2.0-flash";
const video = "./data/3x2-10xcms_24fps.mov";

const videoMetadata = await uploadVideoWithCache(googleGenAi, video);
const testPlan = await generateTestPlan(googleGenAi, model, videoMetadata);

console.log("Test plan generated");

// import fs from "fs";
// import {google} from "@ai-sdk/google";
// import {CoreMessage, generateText, LanguageModelV1} from "ai";
// import {tool} from "ai";
// import {z} from "zod";
// import dotenv from "dotenv";
// dotenv.config();

// import {
//   createTestPlanPrompt,
//   createPageObjectModelPrompt,
//   createPlaywrightTestsPrompt,
// } from "./src/prompts.js";

// const model: LanguageModelV1 = google("gemini-2.0-flash");

// const scenarioName = "collection-editing";
// const video = fs.readFileSync(`./src/data/${scenarioName}.mov`);
// const mimeType = "video/mov";

// console.log(`Sending prompt to Google AI...`);

// const withVideo = (textPrompt: string): CoreMessage[] => [
//   {
//     role: "user",
//     content: [
//       {
//         type: "text",
//         text: textPrompt,
//       },
//       {
//         type: "file",
//         data: video,
//         mimeType,
//       },
//     ],
//   },
// ];

// try {
//   // const {steps} = await generateText({
//   //   model,
//   //   maxSteps: 10,
//   //   toolChoice: "required",
//   //   tools: {
//   //     createPageObjectModelFile: tool({
//   //       description: "Create a page object model file",
//   //       parameters: z.object({
//   //         fileName: z.string().describe("The name of the file to create"),
//   //         fileContent: z.string().describe("The content of the file"),
//   //       }),
//   //       execute: async ({fileName, fileContent}) => {
//   //         fs.writeFileSync(`./e2e/page-objects/${fileName}`, fileContent);
//   //         console.log(
//   //           `Page object model saved to ./e2e/page-objects/${fileName}`
//   //         );
//   //       },
//   //     }),
//   //   },
//   //   messages: withVideo(createPageObjectModelPrompt()),
//   // });

//   // const pageObjectCalls = steps.flatMap((step) => step.toolCalls);

//   // const allPageObjects: string = pageObjectCalls.reduce((acc, call) => {
//   //   const {fileName, fileContent} = call.args;
//   //   acc += `
//   //   <POM_FILE>
//   //     <FILE_NAME>
//   //       ${fileName}
//   //     </FILE_NAME>
//   //     <FILE_CONTENT>
//   //       ${fileContent}
//   //     </FILE_CONTENT>
//   //   </POM_FILE>
//   //   `;
//   //   return acc;
//   // }, "");

//   // // const allPageObjects: string = fs
//   // //   .readdirSync("./e2e/page-objects")
//   // //   .reduce((acc, fileName) => {
//   // //     const fileContent = fs.readFileSync(
//   // //       `./e2e/page-objects/${fileName}`,
//   // //       "utf-8"
//   // //     );
//   // //     acc += `
//   // //   <POM_FILE>
//   // //     <FILE_NAME>
//   // //       ${fileName}
//   // //     </FILE_NAME>
//   // //     <FILE_CONTENT>
//   // //       ${fileContent}
//   // //     </FILE_CONTENT>
//   // //   </POM_FILE>
//   // //   `;
//   // //     return acc;
//   // //   }, "");

//   // const expectedScenarios = [
//   //   "Login",
//   //   "Create a collection",
//   //   "API Documentation",
//   //   "Creating a new item",
//   //   "Deleting an item",
//   // ];

//   // for (const scenario of expectedScenarios) {
//   //   console.log(`Generating test suite for ${scenario}...`);

//   //   await generateText({
//   //     model,
//   //     maxSteps: 1,
//   //     toolChoice: "required",
//   //     tools: {
//   //       createTestSuiteFile: tool({
//   //         description: "Create a test suite file",
//   //         parameters: z.object({
//   //           fileName: z.string().describe("The name of the file to create"),
//   //           fileContent: z.string().describe("The content of the file"),
//   //         }),
//   //         execute: async ({fileName, fileContent}) => {
//   //           fs.writeFileSync(`./e2e/tests/${fileName}`, fileContent);
//   //           console.log(`Test suite saved to ./e2e/tests/${fileName}`);
//   //         },
//   //       }),
//   //     },
//   //     messages: withVideo(
//   //       createPlaywrightTestsPrompt(allPageObjects, [scenario])
//   //     ),
//   //   });
//   // }

//   const {text} = await generateText({
//     model,
//     messages: withVideo(createTestPlanPrompt()),
//   });

//   // Extract test plan content from between the tags
//   const testPlanMatch = text.match(/<test_plan>([\s\S]*)<\/test_plan>/);
//   if (testPlanMatch && testPlanMatch[1]) {
//     const testPlanContent = testPlanMatch[1].trim();
//     fs.writeFileSync("./e2e/test-plan.md", testPlanContent);
//     console.log("Test plan saved to ./e2e/test-plan.md");
//   } else {
//     console.log("No test plan content found between <test_plan> tags");
//   }

//   console.log("Done!");
// } catch (error) {
//   console.error(error);
// }
