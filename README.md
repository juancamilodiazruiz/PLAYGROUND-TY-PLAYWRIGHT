# Playwright Automation Project

This project contains a Playwright setup for API and UI testing, with a focus on exercising the RESTful Booker API and SauceDemo page.

## Prerequisites

Before running the suite, please install:

- Node.js 18 or later
- npm

## Installation

1. Open the project folder.
2. Install dependencies:

```bash
npm install
```

3. Make sure the environment variables are available. The project includes a local `.env` file with credentials for the API and UI tests.

## Execution commands

### API tests

Run all API tests:

```bash
npm test -- --project=api
```

### UI tests

Run UI tests in headless mode:

```bash
npm test -- --project=ui
```

Run UI tests in headed mode:

```bash
npm run test:headed -- --project=ui
```

Open the Playwright UI runner:

```bash
npm run test:ui
```

Debug a test:

```bash
npm run test:debug -- --project=ui
```

## Headless vs UI execution

- Headless mode is used for CI and faster automated runs.
- UI mode is useful during local debugging and exploratory validation.
- The `--headed` option launches a visible browser window for manual observation on client-side.

## Framework architecture

This project is built with Playwright and follows a modular structure:

- `src/` contains reusable API and UI logic.
- `tests/` contains the actual test suites grouped by area, such as `api/` and `ui/`.
- `playwright.config.ts` centralizes the Playwright configuration, base URLs, reporters, and project settings.
- `package.json` defines scripts and dependencies.
- `.env` stores environment values such as API or UI credentials.

The project separates responsabilities by layer:

- API tests validate backend contract behavior.
- UI tests validate browser behavior with real pages and user flows.

## Reporting

The project includes Playwright HTML reporting, which is configured in `playwright.config.ts`.

You can run into your terminal this command to open the last HTML report:

```bash
npx playwright show-report
```

## Manual QA bug reports

The manual exploratory testing findings were separated into two Jira-style bug reports:

- [Bug 1: Inventory data inconsistency](./BUG_01_INVENTORY_DATA_INCONSISTENCY.md)
- [Bug 2: Sorting dropdown does not reorder products](./BUG_02_SORTING_DROPDOWN.md)
