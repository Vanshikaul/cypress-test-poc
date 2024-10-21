Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    return false;
  });
  
import { portalPage } from '../pages/portalPage';
import { getXMinutesFromNow } from '../utils/utils';
  
  // Scenario
  describe('SSP Portal Create Instance', () => {

    before(() => {
      // Visit the page before all tests
      portalPage.visit();
      // Log in and navigate to Create Instance
      cy.get('.sidebar').contains('Create Instance').click();
      cy.url().should('include', '/create/?project=');
      cy.get('#vm_name').should('be.visible'); // Confirm we're on the correct page
    });
  
    it('should enter instance name', () => {
      // Test 1: Enter instance name
      cy.wait(2000);
      cy.get('#vm_name').type(portalPage.getVmName());
      cy.log(`VMNAME == ${portalPage.getVmName()}`)
    });
  
    it('should select the VM Lifetime limit checkbox', () => {
      // Select the VM Lifetime limit checkbox
      cy.wait(2000);
      cy.get('#auto_delete').find('#autodelete').check();
    });
  
    it('should select VM expiry time', () => {
      // Test 2: Select VM expiry time
      cy.wait(2000);
      const expiryTime = getXMinutesFromNow(30);
      cy.get('#stop_on').type(expiryTime);
    });
  
    it('should select VM delete time', () => {
      // Test 3: Select VM delete time
      cy.wait(2000);
      const deleteTime = getXMinutesFromNow(60);
      cy.get('#delete_on').type(deleteTime);
    });

  
    it('should select the project name', () => {
      cy.wait(2000);
      // Test 4: Select the project name
      const projectName = portalPage.getProjectName();  // Replace with actual project name
      cy.get('#project_select').select(projectName);      
    });
  
      
    it('should select VM approver', () => {
      // Test 5: Select VM approver
      cy.wait(10000);
      const approverName = portalPage.getApproverName(); // Replace with actual approver name
      cy.log(`Approver name - ${approverName}`);
      cy.get('#approve_request').find('li').contains(approverName).find('input').click();
      // TODO: remove
      
    });
    
    it('should submit the form and handle alert', () => {
      // Test 6: Submit the form
      cy.get('#submit-instance').click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Are you sure you want to submit?');
      });
      cy.log(`Waiting for the vm (${portalPage.getVmName()}) creation to be approved....`)
      cy.wait(30000);
    });
  
  });
    
    
  