export {};
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to navigate to a specific page using the app's routing
 */
Cypress.Commands.add("navigateTo", (route: string) => {
  cy.visit(route);
  // Wait for any loading states to resolve
  cy.get("body").should("be.visible");
});

/**
 * Custom command to wait for API requests to complete
 */
Cypress.Commands.add("waitForApi", () => {
  cy.intercept("**").as("apiRequest");
  cy.wait("@apiRequest", { timeout: 10000 });
});

/**
 * Custom command to get a DOM element by data-testid attribute
 */
Cypress.Commands.add("getByTestId", (testId: string) => {
  return cy.get(`[data-cy="${testId}"]`);
});

// Type definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Navigate to a specific route in the application
       * @param route - The route to navigate to
       */
      navigateTo(route: string): Chainable<Element>;

      /**
       * Wait for API requests to complete
       */
      waitForApi(): Chainable<null>;

      /**
       * Get a DOM element by its data-testid attribute
       * @param testId - The value of the data-testid attribute
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
