import { FOOD_LIST_URL } from "../constants/constants";
class FoodListPage {
  visit() {
    cy.visit(FOOD_LIST_URL); // change URL based on your app
  }

  getTitle() {
    return cy.get("h2");
  }
}
export const foodListPage = new FoodListPage();
