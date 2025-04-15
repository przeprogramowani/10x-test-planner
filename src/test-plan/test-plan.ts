import {FileData, GoogleGenAI} from "@google/genai";
import {createTestPlanPrompt} from "./test-plan-prompt";
import fs from "fs/promises";
import path from "path";

const testPlanPath = path.resolve(process.cwd(), "data", "test-plan.txt");

async function storeTestPlan(testPlan: string) {
  await fs.writeFile(testPlanPath, testPlan);
}

function extractTestPlan(testPlan: string) {
  const testPlanRegex = /<test_plan>([\s\S]*?)<\/test_plan>/;
  const testPlanMatch = testPlan.match(testPlanRegex);
  return testPlanMatch ? testPlanMatch[1] : null;
}

export async function generateTestPlan(
  googleGenAi: GoogleGenAI,
  model: string,
  videoMetadata: FileData
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
    throw new Error("No test plan found within <test_plan> tags.");
  }

  await storeTestPlan(extractedTestPlan);

  return extractedTestPlan;
}
