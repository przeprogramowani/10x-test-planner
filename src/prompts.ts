export const createPageObjectModelPrompt = () => `
You are an experienced automation engineer tasked with analyzing a video recording of a web application to create Page Object Models (POMs) for use with Playwright. Your goal is to identify key pages, their important elements, and propose appropriate selectors for these elements based only on visible traits and element references.

Please follow these steps to analyze the video and create Page Object Models:

1. Watch the entire video carefully, paying attention to all pages and user interactions.
2. Identify all unique pages shown in the video.
3. For each unique page, perform the following analysis:

Wrap your analysis in <page_analysis> tags:
a. List the page name or identifier (e.g., "Login Page", "Dashboard", "User Profile")
b. Describe the layout and main purpose of the page.
c. Identify important page elements, numbering them for reference:
   1. Form fields with explicit, visible labels
   2. Form fields with no explicit labels but with visible placeholder text
   3. Buttons that the user clicks on
   4. Links that the user clicks on
   5. Dropdowns that the user clicks on
   6. Tables that the user interacts with
   7. Forms that the user fills out
   8. Headers that the user interacts with
   9. Navigation elements
e. For these the selector based ONLY on visible traits and element references. Consider using:
- Visible text content
- Relative positions to other visible elements
- Descriptive attributes that would be visible to a user (e.g., placeholder text)
- Choose the best selector option and explain your reasoning
- DO NOT use IDs, classes, data attributes, or any other DOM-specific selectors that wouldn't be visible in the video

f. Consider potential challenges in automating tests for this page and its elements.

It's OK for this section to be quite long.

4. After analyzing all pages, compile your findings into TypeScript 5 files, one for each page object.

Output Format:
Present each Page Object Model as a separate TypeScript file. Use modern TypeScript syntax, ensuring good practices for readability and type safety, compatible with the Playwright framework.

Example structure (generic, without specific content):

<EXAMPLE_PAGE_OBJECT>
import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightDevPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly gettingStartedHeader: Locator;
  readonly pomLink: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
    this.pomLink = page.locator('li', {
      hasText: 'Guides',
    }).locator('a', {
      hasText: 'Page Object Model',
    });
    this.tocList = page.locator('article div.markdown ul > li > a');
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStartedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
}
</EXAMPLE_PAGE_OBJECT>

Important considerations:
- Create Page Object Models for ALL unique pages shown in the video.
- When reusing other Page Objects, remember to import them from the correct path.
- Focus on identifying page elements and their selectors. Do not describe individual tests or scenarios.
- If you're unsure about a particular element or selector, make a note of it in your analysis.
- Prioritize selectors that are likely to be stable across different states of the application.
- Remember, you can only use selectors based on what would be visible in the video. Do not assume any knowledge of the underlying HTML structure.

Please begin your analysis now, using the <page_analysis> tags for your thought process before presenting the final structured output.

`;

// export const createPageObjectModelPrompt = () => `
// Here is the video recording of the web application.

// You are an experienced automation engineer tasked with analyzing a video recording of a web application to create Page Object Models (POMs) for use with Playwright. Your goal is to identify key pages, their important elements, and propose appropriate selectors for these elements.

// Please follow these steps to analyze the video and create Page Object Models:
// Watch the entire video carefully, paying attention to all pages and user interactions.

// Identify all unique pages shown in the video.

// For each unique page, perform the following analysis:

// Wrap your analysis inside <page_analysis> tags:
// a. List the page name or identifier (e.g., "Login Page", "Dashboard", "User Profile")
// b. Describe the layout and main purpose of the page.
// c. Identify important page elements, numbering them for reference:
// - Input fields with explicit, visible labels
// - Input fields with no explicit labels but with placeholder inside of the input field
// - Buttons that user clicks on
// - Links that user clicks on
// - Dropdowns that user clicks on
// - Tables that user clicks on
// - Forms that user clicks on
// - Headers that user clicks on
// - Navigation elements
// d. For each important element, propose an appropriate selector. Consider using:
// - IDs
// - Classes
// - Data attributes
// - Aria labels
// - Text content
// - References to other elements (e.g. "Next" button inside of the "Add Field" modal)

// e. If you encounter any challenges in identifying elements or proposing selectors, note them here.
// f. Consider potential challenges in automating tests for this page and its elements.

// After analyzing all pages, compile your findings into a structured format as shown in the example below.

// Output your results as a list of TypeScript 5 files in modern syntax, with good practices for readability and type safety, compatible with Playwright framework, one file per page object.

// Important considerations:

// <PAGE_OBJECT_EXAMPLE>
// import { expect, type Locator, type Page } from '@playwright/test';

// export class PlaywrightDevPage {
//   readonly page: Page;
//   readonly getStartedLink: Locator;
//   readonly gettingStartedHeader: Locator;
//   readonly pomLink: Locator;
//   readonly tocList: Locator;

//   constructor(page: Page) {
//     this.page = page;
//     this.getStartedLink = page.locator('a', { hasText: 'Get started' });
//     this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
//     this.pomLink = page.locator('li', {
//       hasText: 'Guides',
//     }).locator('a', {
//       hasText: 'Page Object Model',
//     });
//     this.tocList = page.locator('article div.markdown ul > li > a');
//   }

//   async goto() {
//     await this.page.goto('https://playwright.dev');
//   }

//   async getStarted() {
//     await this.getStartedLink.first().click();
//     await expect(this.gettingStartedHeader).toBeVisible();
//   }

//   async pageObjectModel() {
//     await this.getStarted();
//     await this.pomLink.click();
//   }
// }
// </PAGE_OBJECT_EXAMPLE>

// Ensure you create Page Object Models for ALL unique pages shown in the video, not just the first one or a subset.
// When referencing Page Objects between each other, remember about importing them from the correct path.
// Focus on identifying page elements and their selectors. Do not describe individual tests or scenarios.

// If you're unsure about a particular element or selector, make a note of it in the <rationale> section.
// Prioritize selectors that are likely to be stable across different states of the application.
// Please begin your analysis now, and remember to use the <page_analysis> tags for your thought process before presenting the final structured output.

// `;

export const createPlaywrightTestsPrompt = (
  pageObjectModels: string,
  testScenarios: string[]
) => `
Here is the video recording of the web application and the corresponding Page Object Model (POM) files.

<POM_FILES>
${pageObjectModels}
</POM_FILES>

${testScenarios
  .map(
    (scenario, index) =>
      `<TEST_SCENARIO_${index}>${scenario}</TEST_SCENARIO_${index}>`
  )
  .join("\n")}

You are an experienced automation engineer tasked with analyzing a video recording of a web application and using pre-existing Page Object Models (POMs) to create Playwright test suites.

Your goal is to create exactly ${
  testScenarios.length
} Playwright test suites based on the video and translate them into automated tests using the provided POMs.

Project structure:

e2e
├── page-objects
│   ├── LoginPage.ts
│   └── ...
├── tests
│   ├── createCollection.spec.ts
│   └── ...

Please follow these steps to analyze the video and create the Playwright test suites:

1.  **Analyze the Video:** Watch the entire video carefully, paying close attention to the user's actions, workflows, and the sequence of interactions with the application based on TEST_SCENARIOS.
2. **State considerations:** Do not assume that the application is in a specific state before the test starts. Do not expect the same entities or objects unless you create them in the test. Consider that the application is empty and you need to create all the entities from scratch if needed.
3.  **Map Actions to POMs:** For each TEST_SCENARIO, map the user actions observed in the video to the methods and locators available in the provided Page Object Model files.
4.  **Generate Test Suites:** Write Playwright test suites in TypeScript. Each suite should correspond to a logical grouping of test scenarios (e.g., \`login.spec.ts\`, \`userProfile.spec.ts\`).
    *   Import necessary POM classes into your test files based on project structure: import { LoginPage } from "../page-objects/LoginPage";
    *   Instantiate the page objects as needed within your tests.
    *   Constant values like URLs, usernames, passwords, etc. should be defined as configurable variables in the test files.
    *   Use the methods and locators from the POMs to interact with the application elements (e.g., \`await loginPage.fillUsername('user');\`, \`await dashboardPage.clickProfileLink();\`).
    *   Include assertions (\`expect\`) to verify the application's state after performing actions (e.g., \`await expect(page).toHaveURL(/.*dashboard/);\`, \`await expect(profilePage.getUserNameElement()).toHaveText('John Doe');\`).
    *   Structure your tests clearly using \`describe\` and \`it\` blocks.
    *   For dialogs, modals and async operations, use graceful timeout and retry logic.
    *   Follow modern TypeScript syntax and Playwright best practices for readability, maintainability, and type safety.

**Input:**

*   Video recording of the web application.
*   A set of TypeScript Page Object Model files.
*   A list of TEST_SCENARIOS to be covered.
**Output:**

*   A list of Playwright test suite files (\`*.spec.ts\`) written in TypeScript, utilizing the provided POMs to automate the TEST_SCENARIOS.

**Important Considerations:**

*   Ensure your generated tests directly use the provided POMs for element interaction and structure. Do not redefine selectors or logic already present in the POMs.
*   Focus on creating tests that reflect the workflows shown in the video.
*   Prioritize creating robust and meaningful tests with clear assertions.

Please begin your analysis now and generate the Playwright test suite files.
`;

export const createTestPlanPrompt = () => `
You are an experienced automation engineer tasked with analyzing a video recording of a user browsing through the web application. Your goal is to create a test plan for junior engineer to cover with e2e tests.
Identify key scenarios, their important elements, and summarize everything with a detailed, technical test plan.
Please follow these steps to analyze the video:
- Watch the entire video carefully, paying attention to all pages and user interactions.
- Identify all unique scenarios shown in the video.
- For each unique scenario, perform the following analysis:

Wrap your analysis inside <scenario_analysis> tags:
a. Describe starting point and a clear objective of this scenario.
b. List key pages (including URLs) that this scenario refers to  (e.g., "Login Page", "Dashboard", "User Profile")
c. For each identified page, describe layout by its content and main interactions
d. Identify important UI elements that user interacted with during the scenario, in a form of instruction with randomized values (i.e. fill "Username" input field, submit form by clicking on "Submit" button, etc.):
- Input fields
- Buttons
- Links
- Dropdowns
- Tables
- Forms
- Headers
- Navigation elements
e. If you encounter any challenges in identifying elements, note them here. If the user typed hidden values, mentioned which fields explicitly.
f. Consider potential challenges in automating tests for this page and its elements.

After analyzing all pages, compile your findings into a structured format as shown in the example below.
Output your results as a markdown TEST_PLAN with scenarios numbered with TEST_SCENARIO_1, TEST_SCENARIO_2, etc... and TEST_PLAN_OVERVIEW:

<TEST_PLAN>
  <TEST_SCENARIO_1>
    ## Objective:
    ## Steps taken by user:
    ## Page Objects proposals:
    ## Variables used in steps:
    ## Expected Result:
  </TEST_SCENARIO_1>
  ...

  Once you finish listing scenarios, create executable technical overview for the junior engineer to cover with e2e tests.

  <TEST_PLAN_OVERVIEW>
    ## Page Object Models:
      - LoginPage.ts
      ...
    ## Test Suites:
      - createCollection.spec.ts
      ...
    ## Test Suites Structure:
      e2e
      ├── page-objects
      │   ├── LoginPage.ts
      │   └── ...
      ├── tests
      │   ├── createCollection.spec.ts
      │   └── ...
  </TEST_PLAN_OVERVIEW>
</TEST_PLAN>

Important considerations:
- Ensure that scenarios do not overlap
- Do not assume that the application or test suite is in a specific state before the test starts. Do not expect the same entities or objects unless you create them in the test. Consider that the application is empty and you need to create all the entities from scratch if needed.
- All created entities should have unique names with timestamp.
- Focus on identifying page elements and user interactions
- Try to suggest expected result that you infer from the broader context

Please begin your analysis now, and remember to use the <scenario_analysis> tags for your thought process before presenting the final structured output.

After analysis, wrap your final output in <test_plan> tags.

`;
