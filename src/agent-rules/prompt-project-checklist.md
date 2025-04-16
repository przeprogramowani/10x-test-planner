# Playwright E2E Testing Setup Guide

This guide outlines the precise steps for setting up Playwright E2E tests with TypeScript, including authentication handling and project configuration.

## 1. Initial Setup

1. **Initialize Playwright**
   ```bash
   npm init playwright@latest
   # Choose TypeScript when prompted
   # Choose the e2e directory for tests
   ```

2. **Install Chromium**
   ```bash
   npx playwright install chromium
   ```

## 2. Project Configuration

Create or update `playwright.config.ts` with the following configuration:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'authenticated',
      testMatch: /.*\.auth\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['chromium'],
        storageState: './e2e/.auth/user.json',
      },
    },
    {
      name: 'non-authenticated',
      testMatch: /.*\.noauth\.spec\.ts/,
      use: {
        ...devices['chromium'],
      },
    },
  ],
});
```

## 3. Authentication Setup

1. **Create Auth Setup File**

   Create `e2e/auth.setup.ts`:
   ```typescript
   import { test as setup } from '@playwright/test';

   setup('authenticate', async ({ page }) => {
     // Navigate to login page
     await page.goto('/login');

     // Perform login
     await page.fill('[data-testid="email-input"]', process.env.TEST_USER_EMAIL);
     await page.fill('[data-testid="password-input"]', process.env.TEST_USER_PASSWORD);
     await page.click('[data-testid="login-button"]');

     // Wait for successful login
     await page.waitForURL('/home');

     // Save signed-in state
     await page.context().storageState({
       path: './e2e/.auth/user.json'
     });
   });
   ```

## 5. Updating package.json

```json
"scripts": {
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:coverage": "playwright test --coverage"
}
```

## Important Notes

- All tests run against `http://localhost:3000`
- Using Chromium as the only browser
- Authentication state is preserved between tests using `storageState`
- Tests are organized into authenticated and non-authenticated projects
- Page objects should be used for better maintainability
- Test files should use `.auth.spec.ts` or `.noauth.spec.ts` extensions to match project configurations