#!/usr/bin/env node

import dotenv from "dotenv";
dotenv.config();

import {configureCli} from "./src/cli/options.js";
import {createTestPlanCommand} from "./src/commands/generate-test-plan-command.js";

/**
 * Entry point for the test-planner CLI tool
 */
async function main() {
  const options = configureCli();
  const execute = createTestPlanCommand(options);
  await execute();
}

main();
