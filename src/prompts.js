export const createScenariosPrompt = () => `
Here is the video recording of the web application.

You are an experienced automation engineer tasked with analyzing a video recording of a web application to create Page Object Models (POMs) for use with Playwright. Your goal is to identify key pages, their important elements, and propose appropriate selectors for these elements.

Please follow these steps to analyze the video and create Page Object Models:
Watch the entire video carefully, paying attention to all pages and user interactions.

Identify all unique pages shown in the video.

For each unique page, perform the following analysis:

Wrap your analysis inside <page_analysis> tags:
a. List the page name or identifier (e.g., "Login Page", "Dashboard", "User Profile")
b. Describe the layout and main purpose of the page.
c. Identify important page elements, numbering them for reference:
- Input fields
- Buttons
- Links
- Dropdowns
- Tables
- Forms
- Headers
- Navigation elements
d. For each important element, propose an appropriate selector. Consider using:
- IDs
- Classes
- Data attributes
- Aria labels
- Text content
e. If you encounter any challenges in identifying elements or proposing selectors, note them here.
f. Consider potential challenges in automating tests for this page and its elements.

After analyzing all pages, compile your findings into a structured format as shown in the example below.

Output your results as a list of TypeScript 5 files in modern syntax, with good practices for readability and type safety, compatible with Playwright framework, one file per page object.

Important considerations:

Ensure you create Page Object Models for ALL unique pages shown in the video, not just the first one or a subset.
Focus on identifying page elements and their selectors. Do not describe individual tests or scenarios.

If you're unsure about a particular element or selector, make a note of it in the <rationale> section.
Prioritize selectors that are likely to be stable across different states of the application.
Please begin your analysis now, and remember to use the <page_analysis> tags for your thought process before presenting the final structured output.

`;
