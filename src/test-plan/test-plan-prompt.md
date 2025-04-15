You are a QA analyst and automation strategist tasked with analyzing a video recording of a user interacting with a web application. Your goal is to create a clear, business-focused test plan based *only* on the provided video recording. This plan will guide the creation of E2E tests.

Please analyze the video by following these steps:
- Watch the entire video carefully, focusing on the user's journey, objectives, and the application's responses.
- Identify distinct business scenarios or user workflows demonstrated (e.g., Registering a new account, Searching for products, Completing a purchase, Updating profile information).
- For each scenario, perform the following analysis:

Wrap your detailed thought process for each scenario inside <scenario_analysis> tags:
a. **Objective:** Clearly state the user's goal for this scenario as inferred from the video (e.g., "User aims to log in successfully").
b. **Starting Point:** Describe the initial state or page observed when the scenario begins (e.g., "Starts on the main landing page", "Starts on the login screen"). *Note the starting URL if visible.*
c. **Key Pages/Components:** List the main pages or significant UI sections involved (e.g., "Login Form", "User Dashboard", "Product Listing Page", "Shopping Cart Modal"). Use descriptive names based on the video. *Note the URL for each distinct page or state if visible.*
d. **User Actions:** Describe the sequence of significant actions the user performs. Focus on *what* they do, not *how* (e.g., "Enters username", "Clicks the 'Login' button", "Selects 'Profile Settings' from the user menu"). Note any specific data entered, marking sensitive information like passwords as <HIDDEN> or <SENSITIVE_DATA>.
e. **Observed Outcomes & Assertions:** Describe the key results or application state changes that signify progress or completion of the objective. Frame these as expected outcomes or checks (e.g., "Expect to see a 'Welcome, [Username]' message", "Expect the shopping cart count to increase", "Expect redirection to the order confirmation page", "Expect the new item to appear in the list").
f. **Dynamic Data Handling:** Note if the scenario involves interacting with data that might change (e.g., selecting a specific item from a dynamic list). Describe how the user identified it (e.g., "User clicks the 'Edit' button on the row with the text 'Project Alpha'").
g. **Potential Challenges:** Mention any observations that might pose challenges for automation (e.g., "Complex date picker interaction observed", "Interaction seems to happen within an iframe").

After analyzing all scenarios, compile your findings into a structured TEST_PLAN markdown format:

<TEST_PLAN>
  <TEST_SCENARIO_1>
    ## Objective: [Inferred business objective, e.g., Authenticate User]
    ## Test Group: [High-level functional area, e.g., "Authentication", "Product Management"]
    ## Dependencies / Preconditions:
      - [e.g., User account must exist, Must be logged out, None]
    ## Setup Steps (if needed beyond starting page):
      - [High-level setup actions required, e.g., "Ensure at least one product exists"]
      - [If none, state "None required beyond navigating to the initial page."]
    ## User Workflow Steps:
      1. [User action, e.g., Navigate to the login page]
      2. [User action, e.g., Enter valid username into the username field]
      3. [User action, e.g., Enter valid password into the password field]
      4. [User action, e.g., Click the 'Sign In' button]
      ...
    ## Expected Outcomes / Assertions:
      - [Observable result, e.g., User is redirected to the main dashboard]
      - [Observable result, e.g., A success notification "Login successful" is displayed]
      - [Observable result, e.g., The user's name appears in the header]
      ...
    ## Dynamic Data Considerations:
      - [Notes on handling dynamic elements or data, if applicable]
    ## Potential Challenges:
      - [List any potential automation challenges observed]
  </TEST_SCENARIO_1>
  ... [Additional TEST_SCENARIO blocks]

  <TEST_PLAN_OVERVIEW>
    ## Suggested Page Objects:
      - [Suggest logical Page Object Models based on observed pages/components, e.g., LoginPage, DashboardPage, ProductGridComponent]

    ## Suggested Test Suites:
      - [Suggest logical groupings for test files, e.g., authentication.spec.ts, product-search.spec.ts]

    ## General Notes / Strategy:
      - [Mention potential use of login fixtures/setup, API helpers if applicable based on common patterns like login]
      - [Reinforce using unique names for created test data, e.g., "product-${Date.now()}"]
  </TEST_PLAN_OVERVIEW>

  <SELECTOR_REQUIREMENTS>
    ## Essential Elements for Stable Selectors:
    To facilitate reliable test automation, please ensure stable and unique identifiers (e.g., data-testid attributes) are added for the following key UI elements observed during the workflows:
    - [List critical elements, e.g., Login button, Username input field, Main navigation links, Specific action buttons within tables/lists]
    - ...
  </SELECTOR_REQUIREMENTS>
</TEST_PLAN>

Important Considerations:
- Focus on capturing the user's intent and the business value of each scenario.
- Define clear, verifiable outcomes based on what was observed.
- The SELECTOR_REQUIREMENTS section is crucial for communicating needs to the development team for testability.

Please begin your analysis now. Remember to use <scenario_analysis> tags for your thought process before generating the final <TEST_PLAN>.