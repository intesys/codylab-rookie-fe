describe("Patients feature tests", () => {
  beforeEach(() => {
    // Load patient data from fixture
    cy.fixture("apiMockData.json").then((mockData) => {
      // Stub API requests with interceptors
      cy.intercept("POST", "**/api/patient/*", {
        statusCode: 200,
        body: mockData.patients,
      }).as("getPatients");

      cy.intercept("GET", "**/api/patient/*", {
        statusCode: 200,
        body: mockData.patients[0],
      }).as("getPatient");

      cy.intercept("PUT", "**/api/patient/*", {
        statusCode: 201,
        body: { success: true },
      }).as("updatePatient");

      cy.intercept("POST", "**/api/patient", {
        statusCode: 200,
        body: { success: true },
      }).as("createPatient");

      cy.intercept("DELETE", "**/api/patient/*", {
        statusCode: 200,
        body: { success: true },
      }).as("deletePatient");

      // Pre-configurazione dell'intercept per il filtro
      cy.intercept("POST", "**/api/patient/*", (req) => {
        // Filtraggio dei pazienti
        const filteredPatients = mockData.patients.filter((p) => p.name.includes("Paolo"));
        req.reply({
          statusCode: 200,
          body: filteredPatients,
        });
      }).as("filterPatients");
    });

    // Visit the patients page
    cy.visit("/patients");
  });

  it("should display the patients list page", () => {
    // Check for the Patients title in the page
    cy.contains("Patients database").should("be.visible");

    // Check for any patient cards (using data-cy attribute)
    cy.get('[data-cy="patient-card"]').should("exist");
  });

  it("should navigate to patient details when clicking on a patient", () => {
    // Click on the first patient card
    cy.get('[data-cy="patient-card"]').first().click();

    // Check that we're on a patient detail page
    cy.url().should("include", "/patients/");

    // The page should contain patient information
    cy.contains(/details|dettagli/i).should("be.visible");
  });

  it("should allow creating a new patient", () => {
    // Click on the "Add new patient" button
    cy.get('[data-cy="add-patient-button"]').click();

    // Verify we're on the patient creation page
    cy.url().should("include", "/patients/new");

    // Fill out the form with test data
    cy.get('[data-cy="patient-name-input"]').type("Test");
    cy.get('[data-cy="patient-surname-input"]').type("Patient");
    cy.get('[data-cy="patient-opd-input"]').type("1234");
    cy.get('[data-cy="patient-idp-input"]').type("5678");
    cy.get('[data-cy="patient-address-input"]').type("Via Test 123, Milano");

    // Select blood group from MUI select
    cy.get('[data-cy="patient-blood-group-select"]').click();
    cy.get('ul[role="listbox"] li').contains("A+").click();

    // Submit the form
    cy.get('[data-cy="patient-form-submit"]').click();

    // Wait for the create patient API request to complete
    cy.wait("@createPatient");

    // Verify we're redirected back to the patients list
    cy.url().should("include", "/patients");
  });

  it("should allow filtering patients", () => {
    // Type in one of the filter fields
    cy.get('[data-cy="patient-filter-pid"]').type("1");

    // Submit the search form
    cy.get('[data-cy="patient-filter-form"]').submit();

    // Wait for the filtered results
    cy.wait("@filterPatients");

    // Verify filtered results are displayed - should show fewer cards than before
    cy.get('[data-cy="patient-card"]').should("have.length.at.least", 1);
  });

  it("should allow deleting a patient from the patient detail page", () => {
    // Navigate to the first patient's detail page
    cy.get('[data-cy="patient-card"]').first().click();

    // Look for a delete button or icon and click it
    cy.get('[data-cy="delete-patient-button"]').click();

    // Wait for the delete API request to complete
    cy.wait("@deletePatient"); // Verify the snackbar appears with success message
    cy.get("#notistack-snackbar").should("be.visible");
    cy.get("#notistack-snackbar").should("contain", "deleted");

    // Verify we're redirected back to the patients list
    cy.url().should("include", "/patients");
    cy.url().should("not.include", "/patients/");
  });
});
