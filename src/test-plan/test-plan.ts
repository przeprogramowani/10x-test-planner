import {FileData, GoogleGenAI} from "@google/genai";
import {createTestPlanPrompt} from "./test-plan-prompt.js";
import fs from "fs/promises";

async function storeTestPlan(testPlan: string, outputPath: string) {
  await fs.writeFile(outputPath, testPlan);
}

function extractTestPlan(testPlan: string) {
  // Try uppercased <TEST_PLAN> first
  let testPlanRegex = /<TEST_PLAN>([\s\S]*?)<\/TEST_PLAN>/;
  let testPlanMatch = testPlan.match(testPlanRegex);
  if (testPlanMatch) {
    return testPlanMatch[1];
  }
  // Try lowercased <test_plan>
  testPlanRegex = /<test_plan>([\s\S]*?)<\/test_plan>/;
  testPlanMatch = testPlan.match(testPlanRegex);
  return testPlanMatch ? testPlanMatch[1] : null;
}

export async function generateTestPlan(
  googleGenAi: GoogleGenAI,
  model: string,
  videoMetadata: FileData,
  outputPath: string
): Promise<string> {
  console.log("📝 Generating test plan...");
  const testPlan = await googleGenAi.models.generateContent({
    model,
    contents: [
      {
        fileData: {
          fileUri: videoMetadata.fileUri,
          mimeType: videoMetadata.mimeType,
        },
      },
      {
        role: "user",
        text: createTestPlanPrompt(),
      },
    ],
  });

  if (!testPlan.text) {
    throw new Error("No test plan generated");
  }

  const extractedTestPlan = extractTestPlan(testPlan.text);

  if (!extractedTestPlan) {
    throw new Error("No test plan found within <TEST_PLAN> tags.");
  }

  await storeTestPlan(extractedTestPlan, outputPath);

  return extractedTestPlan;
}
