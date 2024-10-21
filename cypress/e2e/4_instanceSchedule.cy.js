Cypress.on("uncaught:exception", (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  return false;
});

import { portalPage } from "../pages/portalPage";
import { getTimeXMinsFromNow } from "../utils/utils";

describe("SSP Instance Scheduler", () => {
  before(() => {
    // Set up the session and login (you may need to fill in the login steps)
    portalPage.visit();
  });

  // Click on the 'Instance Schedule' link in the sidebar
  it("should click the Instance Schedule link", () => {
    cy.get(".sidebar a").contains("Instance Schedule").click();
    cy.log("Navigated to Instance Schedule Page");
    cy.wait(4000); // Equivalent to time.sleep(4)
  });

  // Select the project from the dropdown
  it("should select the project", () => {
    cy.get("#project_select").select(portalPage.getProjectName()); // Assuming 'projectName' is an env variable
    cy.wait(2000); // Equivalent to time.sleep(2)
  });

  // Submit the project name filter
  it("should submit the project name filter", () => {
    cy.contains("button", "Submit").click();
    cy.wait(4000); // Equivalent to time.sleep(4)
  });

  // Create a new schedule and input a stop time
  it("should create a new schedule", () => {
    cy.contains("button", "Create schedule").click();
    cy.wait(2000);
    cy.get("#schedule_name").clear().type(portalPage.schedule_name); // Type VM name

    // Set stop time to current time + 30 minutes
    const stopTime = getTimeXMinsFromNow(30);
    cy.get("#stop_time").clear().type(stopTime); // Input time
    cy.wait(1000);
    // Click create button
    cy.get("#modal_button").should("be.visible").click();
    cy.get("#modal_button").should("be.visible").click();
    cy.wait(5000); // Equivalent to time.sleep(10)
    cy.pause();
  });

  // Select instance and check schedule
  it("should check the instance schedule", () => {
    cy.get("#project_select").select(portalPage.getProjectName()); // Re-select the project
    cy.contains("button", "Submit").click(); // Submit the project filter again
    cy.wait(10000); // Equivalent to time.sleep(10)
  });

  // Click the specific schedule link and add instance
  it("should add instance to the schedule", () => {
    cy.get(`tr#row_${portalPage.schedule_name} a`).click(); // Click the scheduler link
    cy.get("button.btn-outline-primary")
      .contains("ADD INSTANCES TO SCHEDULE")
      .should("be.visible") // Optional: Ensure the button is visible
      .click();
    // Click 'Add Instance'
    cy.wait(10000); // Equivalent to time.sleep(20)

    // Check all instances
    cy.get("#datatableCheckAll1").click(); // Select all instances
    cy.get("#add_instances").click(); // Add instances to the schedule

    // Handle alert confirmation
    cy.on("window:alert", (text) => {
      expect(text).to.contains("success"); // Customize the alert validation based on what you expect
    });
  });
});
