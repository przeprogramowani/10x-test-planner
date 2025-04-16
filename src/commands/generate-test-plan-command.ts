import fs from "fs/promises";
import path from "path";
import {CliOptions} from "../cli/options.js";
import {createGenAiClient} from "../genai-client/create-client.js";
import {uploadVideoWithCache} from "../video-uploader/video.js";
import {generateTestPlan} from "../test-plan/test-plan.js";
import {generateAgentRules} from "../agent-rules/agent-rules.js";
import {optimizeVideo} from "../video-optimizer/video-optimizer.js";
import {normalizePath, getOutputPaths} from "../utils/path-utils.js";

/**
 * Process the video, optimizing it if requested
 * @param options CLI options
 * @returns Path to the processed video
 */
async function processVideo(options: CliOptions): Promise<string> {
  let videoPath = normalizePath(options.video);

  // Optimize video if requested
  if (options.optimize) {
    console.log(`🔧 Optimizing video with ${options.fps} fps...`);
    const optimized = await optimizeVideo(videoPath, options.fps);
    videoPath = optimized.optimizedPath;
    console.log(`🎬 Using optimized video: ${path.basename(videoPath)}`);
  }

  return videoPath;
}

/**
 * Generate and save the test plan
 * @param options CLI options
 * @param videoPath Path to the video to process
 */
async function generateAndSaveTestPlan(
  options: CliOptions,
  videoPath: string
): Promise<void> {
  const googleGenAi = createGenAiClient();
  const videoMetadata = await uploadVideoWithCache(googleGenAi, videoPath);

  // Determine output path
  const outputPaths = getOutputPaths(options);

  const testPlan = await generateTestPlan(
    googleGenAi,
    options.model,
    videoMetadata,
    outputPaths.testPlan
  );

  // Ensure directory exists
  const outDir = path.dirname(outputPaths.testPlan);
  await fs.mkdir(outDir, {recursive: true});

  // Write test plan to file
  await fs.writeFile(outputPaths.testPlan, testPlan);

  // Generate and save agent rules
  await generateAgentRules(
    outputPaths.projectChecklist,
    outputPaths.agentRules
  );
  console.log("✅ Agent rules saved!");
}

/**
 * Creates a command to generate a test plan from a video using AI
 * @param options CLI options
 * @returns An executable function that runs the command
 */
export function createTestPlanCommand(options: CliOptions) {
  /**
   * Execute the command to generate a test plan
   */
  return async function execute(): Promise<void> {
    try {
      console.log(`✨ Generating test plan for video: ${options.video}`);

      // Process the video (optimizing if needed)
      const videoPath = await processVideo(options);

      // Generate and save the test plan
      await generateAndSaveTestPlan(options, videoPath);

      console.log("✅ Test plan saved successfully!");
    } catch (error) {
      console.error("Error generating test plan:", error);
      process.exit(1);
    }
  };
}
