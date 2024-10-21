import { PASSWORD, USERNAME } from "../constants/constants";
import { loginPage } from "../pages/loginPage";

// Scenario
describe("Login Flow", () => {
  beforeEach(() => {
    cy.session("user-session", () => {
      loginPage.visit();
      loginPage.enterUsername(USERNAME);
      loginPage.enterPassword(PASSWORD);
      loginPage.submit();
      // Assume successful login redirects to /dashboard
      cy.url().should("include", "/logged-in-successfully");
    });
  });

  // step
  it("should display an error for invalid credentials", () => {
    // Arrange
    loginPage.visit();

    // Act
    loginPage.enterUsername("invalidUsername");
    loginPage.enterPassword("invalidPassword");
    loginPage.submit();
    // cy.pause();
    // Assert
    console.log(cy.get("#error"));
    cy.get("#error")
      .invoke("text")
      .should("match", /Your (password|username) is invalid!/);
  });
  // it("should successfully login with valid credentials", () => {
  //   // Arrange
  //   loginPage.visit();

  //   // Act
  //   loginPage.enterUsername(USERNAME);
  //   loginPage.enterPassword(PASSWORD);
  //   loginPage.submit();

  //   // Assert
  //   cy.url().should("include", "/logged-in-successfully");
  //   cy.get(".post-title").should("contain", "Logged In Successfully");
  // });

  it("Should verify all menu items are present", () => {
    // Visit the webpage
    cy.visit("https://practicetestautomation.com/logged-in-successfully/");

    // Array of expected menu item texts
    const menuItems = ["Home", "Practice", "Courses", "Blog", "Contact"];

    // Loop through the expected menu items and verify they are present
    menuItems.forEach((item) => {
      cy.get("nav.menu ul.menu-primary-items")
        .contains(item)
        .should("be.visible");
    });
  });

  it("Should click on Practice link and check for Practice heading", () => {
    // Click on the Practice link
    cy.visit("https://practicetestautomation.com/logged-in-successfully/");
    cy.wait(2000);
    cy.pause();
    cy.get("nav.menu ul.menu-primary-items").contains("Practice").click();

    // Check if the Practice heading is displayed
    cy.get("div.post-header h1.post-title").should("have.text", "Practice");
  });
});

//
