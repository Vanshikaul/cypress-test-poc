import { portalPage } from "../pages/portalPage";

Cypress.on("uncaught:exception", (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  return false;
});

describe("Test SSP Instance List", () => {
  before(() => {
    // Set the VM name from some utility function similar to webdriver.getVmName()
    portalPage.visit();
  });

  // Select the project
  it("Select project name", () => {
    cy.log(`VMNAME == ${portalPage.getVmName()}`);
    cy.get("#project_select").select(portalPage.getProjectName()); // Replace with actual project name
    cy.wait(2000); // Equivalent to time.sleep(2)
  });

  // Submit the project name filter
  it("submit project name filter", () => {
    cy.get("#project_filter_btn").click();
    cy.wait(4000);
  });

  // Check instance and refresh if not found
  it("check instance and refresh", () => {
    cy.wait(10000); // Equivalent to time.sleep(10)
    cy.log(checkInstanceNamePresent());
    checkInstanceNamePresent().then(instancePresent => {
        if (!instancePresent) {
          refreshAndCheckInstanceNamePresent();
        }
      });
  });

  // Create a snapshot
  it("instance snapshot", () => {
    cy.wait(5000);
    cy.log("Instance Snapshot started");
    cy.log(`VMNAME == ${portalPage.getVmName()}`);
    cy.get(`#btn_${portalPage.getVmName()}`).click();
    cy.wait(3000);
    cy.get(`#snapshot_${portalPage.getVmName()}`).click();
    cy.wait(2000)
    //  snapshot modal
    // Open the modal (make sure to trigger the modal in your application)
    cy.get('#SnapshotModal').should('be.visible'); // Ensure the modal is visible

    // Type the snapshot name
    cy.get('#snapshot-name').type(portalPage.getSnapshotName());

    // Type the snapshot description
    cy.get('#snapshot-description').type(portalPage.snapshot_description);

    // Pause for inspection or debugging

    // Click the Create button
    cy.get('#snapshot_modal_button').click();

    cy.log("Instance snapshot success");
    cy.wait(15000);
  });

  // Suspend and resume the instance
  it("suspend instance", () => {
    cy.wait(5000);
    refreshInstance();
    cy.log("Suspend instance - refresh success");
    cy.log(`VMNAME == ${portalPage.getVmName()}`);
    cy.get(`#btn_${portalPage.getVmName()}`).click();
    cy.wait(5000);
    // failing here
    cy.get(`#action_${portalPage.getVmName()}_susp_res`).click();
    cy.wait(30000);
    refreshInstance();
    cy.wait(15000);
    cy.log("Suspend Instance success");

    // Resume instance
    refreshInstance();
    cy.wait(10000);
    cy.log("Resume instance - refresh success");
    cy.log(`VMNAME == ${portalPage.getVmName()}`);
    cy.get(`#btn_${portalPage.getVmName()}`).click();
    cy.wait(5000);
    cy.get(`#action_${portalPage.getVmName()}_susp_res`).click();
    cy.wait(30000);
    refreshInstance();
    cy.wait(30000);
    cy.log("Resume Instance success");
  });

  // Start and stop the instance
  it("stop and start instance", () => {
    refreshAndCheckInstanceNamePresent();
    cy.wait(10000);
    cy.log(`VMNAME == ${portalPage.getVmName()}`);
    cy.get(`#btn_${portalPage.getVmName()}`).click();
    cy.wait(5000);
    cy.get(`#action_${portalPage.getVmName()}`).click();
    cy.wait(30000);
    refreshInstance();
    cy.wait(30000);
    refreshInstance();
    cy.wait(40000);
    refreshInstance();
  });

  // Change the disk size of the instance
  it("should edit instance and change disk size to 110", () => {
    const vm_name = portalPage.getVmName(); // Replace with the actual vm name
    cy.wait(4000);

    // Click the button to edit the instance
    cy.get(`#btn_${vm_name}`).click();
    cy.wait(3000);

    // Click the edit button
    cy.get(`#edit_${vm_name}`).click();

    // Change Disk Size to 110 (default is 100)
    cy.wait(4000);
    cy.get("#disk_size").clear();
    cy.wait(2000);
    cy.get("#disk_size").type("110");

    cy.wait(2000);

    // Submit the changes
    cy.get("#submit-instance").click();

    // Handle the confirmation alert
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.contains("Are you sure you want to submit?");
    });
    cy.wait(2000);

    // Navigate back to Instances List
    cy.get(".sidebar").find("a").contains("Instances List").click();
    cy.wait(3000);
  });

  // Helper Functions
  function refreshInstance() {
    cy.get("#refresh").click();
    cy.wait(4000);
  }

function checkInstanceNamePresent() {
  return cy.get(`#row_${portalPage.getVmName()}`).then($el => {
    return $el.length > 0; // Return true if instance is present
  });
}

  function refreshAndCheckInstanceNamePresent() {
    refreshInstance();
    cy.wait(4000);
    return checkInstanceNamePresent();
  }
});
