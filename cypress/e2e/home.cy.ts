describe("Home Page", () => {
  beforeEach(() => {
    // Visit the home page before each test using baseUrl from cypress.config.ts
    cy.visit("/");
  });

  it("should load the home page successfully", () => {
    // Check that the page has loaded by looking for specific elements with data attributes
    cy.get('[data-cy="home-page"]').should("be.visible");
    cy.get('[data-cy="welcome-message"]').should("be.visible");
    cy.get('[data-cy="welcome-user-name"]').should("contain", "Mario Rossi");
  });

  it("should display the main sections on the home page", () => {
    // Test for the presence of main sections using data attributes
    cy.get('[data-cy="materials-section-title"]').should("be.visible").and("contain", "Materials are running out");
    cy.get('[data-cy="materials-section"]').should("be.visible");
    cy.get('[data-cy="calendar-section-title"]').should("be.visible").and("contain", "Calendar");
    cy.get('[data-cy="calendar-section"]').should("be.visible");
  });

  it("should display call to action buttons", () => {
    cy.get('[data-cy="call-to-actions"]').should("be.visible");
    cy.get('[data-cy="register-patient-button"]').should("be.visible").and("contain", "Register new patient");
  });

  it("should display material list with tabs", () => {
    cy.get('[data-cy="material-tabs"]').should("be.visible");
    cy.get('[data-cy="drugs-tab"]').should("be.visible");
    cy.get('[data-cy="material-items-list"]').should("exist");
    cy.get('[data-cy="material-item"]').should("have.length.at.least", 1);
  });

  it("should allow navigation to other pages", () => {
    // Test navigation using the main menu links with data-cy attributes
    cy.get('[data-cy="menu-patients"]').click();
    cy.url().should("include", "/patients");
    cy.get('[data-cy="page-title"]').should("be.visible");

    cy.go("back");

    cy.get('[data-cy="menu-doctors"]').click();
    cy.url().should("include", "/doctors");
    cy.get('[data-cy="doctors-list"]').should("be.visible");
  });
});
