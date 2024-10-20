import { PASSWORD, USERNAME } from '../constants/constants';
import { loginPage } from '../pages/loginPage';

// Scenario
describe('Login Flow', () => {
  // step
  it('should display an error for invalid credentials', () => {
    // Arrange
    loginPage.visit();
    
    // Act
    loginPage.enterUsername('invalidUsername');
    loginPage.enterPassword('invalidPassword');
    loginPage.submit();
    // cy.pause();
    // Assert
    console.log(cy.get("#error"))
    cy.get('#error').invoke('text').should('match', /Your (password|username) is invalid!/);
  });
  it('should successfully login with valid credentials', () => {
    // Arrange
    loginPage.visit();
    
    // Act
    loginPage.enterUsername(USERNAME);
    loginPage.enterPassword(PASSWORD);
    loginPage.submit();
    
    // Assert
    cy.url().should('include', '/logged-in-successfully');
    cy.get('.post-title').should('contain', 'Logged In Successfully');
  });

});

//
