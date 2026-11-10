# Odoo CRM Test Automation (Playwright + JavaScript)

End-to-end UI test automation for the **Odoo CRM** module, built with
**Playwright** and **JavaScript** using the **Page Object Model** and
**object-oriented design**.

<img width="752" height="459" alt="image" src="https://github.com/user-attachments/assets/648106d0-8997-401e-994d-d0179abb55f6" />


## What this project shows

- **OOP design**: a `BasePage` parent class with page classes that inherit from it
- **Page Object Model**: each screen has its own class, so tests read like business steps
- **Fixtures**: page objects are injected into tests, so there is no repeated setup code
- **Login once, reuse everywhere**: the session is saved and reused (faster, more stable tests)
- **Hooks and steps**: `beforeEach`, `afterEach` and `test.step()` for clear reports
- **Reports and debugging**: HTML report, screenshots, video and trace viewer on failure
- **Good practice**: unique test data, tags (`@smoke`), no hard waits, secrets kept in `.env`

## Tech stack

Playwright Test, JavaScript (Node.js), dotenv, Odoo CRM (online trial)

## Project structure

```
pages/                      Page Object classes
  BasePage.js               Parent class with shared helpers
  LoginPage.js
  CrmPipelinePage.js        Kanban pipeline screen
  OpportunityFormPage.js    Opportunity form screen
tests/
  auth.setup.js             Logs in once and saves the session
  fixtures.js               Gives page objects to the tests
  login.spec.js             Login tests
  opportunity.spec.js       CRM opportunity tests
  tabs.spec.js              New tab handling
utils/
  TestData.js               Test data helpers
playwright.config.js        Settings, reporters, projects
```

## What is tested

| Area | Scenario |
|---|---|
| Login | Valid login works |
| Login | Wrong password shows an error |
| Login | Empty credentials are rejected |
| CRM | Create an opportunity and find it with search |
| CRM | Edit revenue, move through stages, mark as won |
| CRM | Search for a record that does not exist |
| Navigation | Documentation link opens in a new tab |

## How to run it

You need Node.js 18+ and an Odoo account. A free trial works: https://www.odoo.com/trial (install the CRM app).

```bash
git clone https://github.com/[your-username]/odoo-crm-playwright-automation.git
cd odoo-crm-playwright-automation
npm install
npx playwright install
```

Create a `.env` file (copy `.env.example`) and fill in your own details:

```
BASE_URL=https://your-database.odoo.com
ODOO_USER=your_login_email
ODOO_PASS=your_password
```

Run the tests:

```bash
npm test              # run all tests
npm run test:smoke    # only smoke tests
npm run test:headed   # watch the browser
npm run test:ui       # Playwright UI mode
npm run report        # open the HTML report
```

## How it works

1. A setup test logs in once and saves the session.
2. All other tests reuse that session.
3. Tests call page methods such as `crmPage.createOpportunity(title)`.
   They never use raw selectors.
4. Every page class extends `BasePage`, which has shared helpers, including
   one that finds Odoo form fields by their stable `name` attribute.
5. Test data uses unique names, so reruns do not clash.

## Design choices

- **Stable locators**: roles, labels, placeholders and Odoo field names instead of long CSS chains
- **No fixed waits**: Playwright's auto-waiting and assertions handle timing
- **Direct URL for the CRM app**: faster and less flaky than clicking through menus
- **One worker**: the trial uses a single shared database, so tests run one at a time

## Planned improvements

- [ ] Add API-level tests (Odoo JSON-RPC) for faster test data setup
- [ ] Data-driven tests from a JSON file
- [ ] GitHub Actions pipeline
- [ ] Run on more browsers (Firefox, WebKit)

## About me

**Junnatul Mawa**, SQA Engineer with experience in manual testing, API testing
(Postman), bug reporting and test documentation. Building my Playwright
automation skills.
