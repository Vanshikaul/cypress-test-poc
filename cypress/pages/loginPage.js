import {WEBSITE_URL} from '../constants/constants'
class LoginPage {
    visit() {
      cy.visit(WEBSITE_URL);  // change URL based on your app
    }
  
    enterUsername(username) {
      cy.get('input[name="username"]').type(username);
    }
  
    enterPassword(password) {
      cy.get('input[name="password"]').type(password);
    }
  
    submit() {
      cy.get('button[id="submit"]').click();
    }
  }
  export const loginPage = new LoginPage();
  