
import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import process from 'node:process';

export default defineConfig({
  testDir: './tests',

  timeout: 60_000,

  expect: {
    timeout: 10_000,
  },

  fullyParallel: true,

  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',

      use: {
        baseURL:
          process.env.API_BASE_URL ??
          'https://restful-booker.herokuapp.com',

        extraHTTPHeaders: {
          Accept: 'application/json',
        },
      },
    },

    {
      name: 'ui',
      testMatch: '**/ui/**/*.spec.ts',

      use: {
        ...devices['Desktop Chrome'],

        baseURL:
          process.env.UI_BASE_URL ??
          'https://www.saucedemo.com',
      },
    },
  ],
});