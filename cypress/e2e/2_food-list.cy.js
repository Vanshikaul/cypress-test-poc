import { foodListPage } from "../pages/foodList";

describe("Food list", () => {
  it("should verify the page title is 'Test Exceptions'", () => {
    // Arrange
    foodListPage.visit();

    // Act
    foodListPage.getTitle().should("have.text", "Test Exceptions");
  });
});
