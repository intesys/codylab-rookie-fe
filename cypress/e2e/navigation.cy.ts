describe("Navigation tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have working navigation links", () => {
    // Check the main menu navigation
    cy.get('[data-cy="menu-doctors"]').click();
    cy.url().should("include", "/doctors");

    cy.get('[data-cy="menu-patients"]').click();
    cy.url().should("include", "/patients");

    // Navigate back home
    cy.get('[data-cy="menu-dashboard"]').click();
    cy.url().should("include", "/");
  });

  it("should render breadcrumb navigation correctly", () => {
    // Navigate to doctors page
    cy.get('[data-cy="menu-doctors"]').click();

    // Check if breadcrumb is visible
    cy.get('[data-cy="breadcrumb"]').should("exist"); // Check if breadcrumb contains the current page
    cy.get('[data-cy="breadcrumb-active"]').should("be.visible");
    cy.get('[data-cy="page-title"]').should("contain", "Doctors");
  });
});
