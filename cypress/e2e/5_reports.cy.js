Cypress.on("uncaught:exception", (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  return false;
});

import { portalPage } from "../pages/portalPage";
import { getTimeXMinsFromNow } from "../utils/utils";

describe("SSP Reports", () => {
  before(() => {
    // Set up the session and login (you may need to fill in the login steps)
    portalPage.visit();
  });

  // Click on the 'Instance Schedule' link in the sidebar
  it("should click the Instance Schedule link", () => {
    cy.get(".sidebar a").contains("Reports").click();
    cy.log("Navigated to Reports Page");
    cy.contains("h4", "Report Dashboard").should("be.visible");
    cy.wait(4000); // Equivalent to time.sleep(4)
  });

  // Select the project from the dropdown
  it("Click on user reports", () => {
    cy.get(".card-title").contains("User Reports").click();
    cy.wait(2000); // Equivalent to time.sleep(2)
    cy.get("#project_select").select(portalPage.getProjectName()); // Replace with actual project name
    cy.wait(2000); // Equivalent to time.sleep(2)
    cy.get(".card-action").contains("Submit").click();
    cy.get("#basic-datatables").should("be.visible");
  });

  // Select the project from the dropdown
  it("Click on instances reports", () => {
    // Go to reports page
    cy.get(".sidebar a").contains("Reports").click();
    cy.get(".card-title").contains("Instances Reports").click();
    cy.wait(2000); // Equivalent to time.sleep(2)
    cy.get("#project_select").select(portalPage.getProjectName()); // Replace with actual project name
    cy.wait(2000); // Equivalent to time.sleep(2)
    cy.get("#time_range").select(portalPage.one_week); // Replace with actual project name
    cy.wait(2000); // Equivalent to time.sleep(2)
    cy.get("#instance_filter_form").contains("Submit").click();
    cy.get("#basic-datatables").should("be.visible");
  });
});
