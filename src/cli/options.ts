import {Command} from "commander";

/**
 * Interface defining all CLI options for the test planner
 */
export interface CliOptions {
  video: string;
  outDir: string;
  model: string;
  optimize: boolean;
  fps: number;
}

/**
 * Configures and returns the CLI options
 */
export function configureCli(): CliOptions {
  const program = new Command();

  program
    .name("test-planner")
    .description("Generate test plans from video recordings")
    .version("0.0.1")
    .requiredOption("--video <path>", "Path to the video file")
    .option("--outDir <path>", "Output directory for the test plan", "./e2e")
    .option("--model <name>", "Model to use", "gemini-2.0-flash")
    .option(
      "--optimize",
      "Optimize video using ffmpeg before processing",
      false
    )
    .option(
      "--fps <number>",
      "Frames per second for optimized video (requires --optimize)",
      "15"
    )
    .parse(process.argv);

  const options = program.opts() as CliOptions;

  // When using the fps option, convert it from string to number
  if (options.fps) {
    options.fps = parseInt(options.fps as unknown as string, 10);
  }

  return options;
}
