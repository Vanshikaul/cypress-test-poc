const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  
  reporterOptions: {
    reportDir: "cypress/reports", // Path for the report
    overwrite: false, // Don't overwrite reports
    html: false, // Generate HTML report
    json: true, // Generate JSON report
    charts: true, // Include charts in the report
    embeddedScreenshots: true, // Embed screenshots
    inlineAssets: true, // Inline CSS and JS assets for portability
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
    preserveSession: true,
    preserveCookies: true, 
    testIsolation: false, 
    experimentalRunAllSpecs: true,
  },
});
