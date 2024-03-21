// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // test folder path
  testDir: './tests',

  use: {
    
    browserName: 'chromium', // setting chromium browser to run test
    headless: false   // setting the headed mode
  },

 
});

