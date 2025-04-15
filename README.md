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

### Environment Variables

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

### Example Usage

```bash
npx @10xdevspl/test-planner --video=user-session.mov --outDir=./my-tests
```

## Requirements

- Node.js 22 or higher
- (Optional) If using the `--optimize` flag, ffmpeg must be installed on your system

## License

ISC
