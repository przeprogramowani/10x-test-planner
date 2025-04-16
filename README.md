# Test Planner by 10xDevs

```bash
 _____         _     ____  _
|_   _|__  ___| |_  |  _ \| | __ _ _ __  _ __   ___ _ __
  | |/ _ \/ __| __| | |_) | |/ _` | '_ \| '_ \ / _ \ '__|
  | |  __/\__ \ |_  |  __/| | (_| | | | | | | |  __/ |
  |_|\___||___/\__| |_|   |_|\__,_|_| |_|_| |_|\___|_|
```

A Node-based CLI tool to generate test plans from video recordings using Google's Gemini models.

Created test plan can be used as an input for Agentic AI model such Claude 3.7 Sonnet - it contains scenarios, steps and expected selectors to cover your project with E2E tests.

All the [constraints](https://ai.google.dev/gemini-api/docs/vision?lang=node#prompting-video) of Google Generative AI models must be followed.

## Installation

```bash
npm install -g @10xdevspl/test-planner
```

## Usage

### Using npx

```bash
npx @10xdevspl/test-planner --video=user-session.mov --outDir=./my-tests
```

### Authentication

Include the following environment variable in your `.env` file or pass it as an argument:

```
GOOGLE_API_KEY=your_api_key_here
```

Generate it here - [Google AI Studio](https://aistudio.google.com/apikey)

### Options

- `--video <path>` (required): Path to the video file to analyze
- `--outDir <path>`: Output directory for the test plan (default: `./e2e`)
- `--model <name>`: Gemini model to use (default: `gemini-2.0-flash`)
- `--optimize`: Optimize video using ffmpeg before processing (default: `false`)
- `--fps <number>`: Frames per second for optimized video (default: `15`, requires `--optimize`)

### Requirements

- Node.js 22 or higher
- (Optional) If using the `--optimize` flag, ffmpeg must be installed on your system

## Test Plan Structure

The library generates a test plan, followed by Playwright bootstrap and rules for AI.

- `test-plan.md` - the main test plan file
- `project-checklist.md` - initial configuration of Playwright projects
- `agent-rules.md` - rules for AI to follow

Example scenario based on the video:

```xml
<TEST_SCENARIO_1>
  ## Objective: Authenticate User
  ## Test Group: Authentication
  ## Dependencies / Preconditions:
    - User account "10xadmin" must exist.
    - User must be logged out.
  ## Setup Steps (if needed beyond starting page):
    - None required beyond navigating to the initial page.
  ## Test Suite: authentication.auth.spec.ts
  ## User Workflow Steps:
    1. Navigate to the login page (localhost:3000/login).
    2. Enter valid username "10xadmin" into the username field.
    3. Enter valid password <HIDDEN> into the password field.
    4. Click the 'Login' button.
  ## Expected Outcomes / Assertions:
    - User is redirected to the main dashboard (localhost:3000/home).
  ## Dynamic Data Considerations:
    - None.
  ## Potential Challenges:
    - None.
</TEST_SCENARIO_1>
```

For the best results, always attach `agent-rules.md` to prompts that you use to create final test suites.

### Recommended models for test suite generation

- `gemini-2.5-pro`
- `claude-3-7-sonnet`

## License

ISC
