// @ts-check
const { devices } = require("@playwright/test")

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config()

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
	testDir: "./tests/specs",
	/* Maximum time one test can run for. */
	timeout: 60000,
	expect: {
	/**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
		timeout: 20000
	},
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: true,
	/* Retry on CI only */
	retries: 0,
	/* Opt out of parallel tests on CI. */
	workers: 1,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	// reporter: [ 
	// 	[ "list" ],
	// 	[ "junit", { 
	// 		outputFile: "./test-results/results.xml" 
	// 	} ],
	// 	[ "allure-playwright", {
	// 		detail:false,
	// 		suiteTitle: true
	// 	}, ]
	// ],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 20000,
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://localhost:3000',
		baseURL: 'http://localhost:3000',
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "on-first-retry"
	},

	/* Maximum number of test failures for the whole test suite run */
	maxFailures: 15,

	/* Configure projects for major browsers */
	projects: [
		{
			name: "Chrome",
			use: {
				...devices["Desktop Chrome"],
				permissions:["notifications"],
				launchOptions:{
					args: [
						"--disable-infobars",
						"--window-size=1920,1080",
						"--use-fake-ui-for-media-stream",
						"--use-fake-device-for-media-stream",
						"--suppress-message-center-popups"
					]
				},	
			},
		},
		{
			name: "Edge",
			use: {
				channel: "msedge",
				permissions:["notifications"],
				launchOptions:{
					args: [
						"--disable-infobars",
						"--window-size=1920,1080",
						"--use-fake-ui-for-media-stream",
						"--use-fake-device-for-media-stream",
						"--suppress-message-center-popups"
					]
				}	
			},
		}

		// {
		//   name: 'firefox',
		//   use: {
		//     ...devices['Desktop Firefox'],
		//   },
		// },

		// {
		//   name: 'webkit',
		//   use: {
		//     ...devices['Desktop Safari'],
		//   },
		// },

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: {
		//     ...devices['Pixel 5'],
		//   },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: {
		//     ...devices['iPhone 12'],
		//   },
		// },

	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	// outputDir: 'test-results/',

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   port: 3000,
	// },
}

module.exports = config
