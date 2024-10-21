Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  return false;
});

import { portalPage } from '../pages/portalPage';

// Scenario
describe('SSP Portal Loading Check', () => {
  
  beforeEach(() => {
    cy.session("user-session", () => {
      portalPage.visit();      
      // Assume successful login redirects to /dashboard
      portalPage.getHeader().should('be.visible'); 
    });
  });

  it('Verify portal elements in sidebar', ()=>{
    portalPage.visit();
        // Array of labels to check
        const sidebarLinks = [
          'Instances List',
          'Create Instance',
          'Instance Schedule',
          'Instance Presets',
          'Machine Images',
          'Instance Templates',
          'Snapshots',
          'Approve List',
          'Booked Instances',
          'Reports'
        ];
    
        // Check each label is present in the sidebar
        sidebarLinks.forEach((label) => {
          cy.get('.sidebar-content').contains(label).should('exist');  // Check if the link with the label exists
        });
    
  })

});

