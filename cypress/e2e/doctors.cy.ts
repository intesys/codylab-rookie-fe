describe("Doctors feature tests", () => {
  beforeEach(() => {
    // Load mock data for consistent test results
    cy.fixture("apiMockData.json").as("mockData");

    // Intercept API requests
    cy.get("@mockData").then((mockData: any) => {
      cy.intercept("POST", "**/api/doctor/*", {
        statusCode: 200,
        body: mockData.doctors,
      }).as("getDoctors");

      cy.intercept("GET", "**/api/doctor/*", {
        statusCode: 200,
        body: mockData.doctors[0],
      }).as("getDoctor");

      cy.intercept("POST", "**/api/patient/*", {
        statusCode: 200,
        body: mockData.patients,
      }).as("filterPatients");
    });

    cy.visit("/doctors");
    cy.wait("@getDoctors");
  });
  it("should display the doctors list page", () => {
    // Check if the page title is visible
    // Using contains() is acceptable here as we're explicitly testing for the text content
    cy.getByTestId("page-title")
      .contains(/doctors|medici/i)
      .should("be.visible");

    // Verify the doctors list exists
    cy.getByTestId("doctors-list").should("be.visible");

    // Verify doctors are displayed in the list
    cy.getByTestId("doctor-item").should("have.length.at.least", 1);
  });
  it("should allow filtering of doctors", () => {
    // Set up network interception for filtered results
    cy.intercept("POST", "**/api/doctor/*").as("filterDoctors"); // Verify filter form exists
    cy.getByTestId("filters-form").should("exist");

    // Fill out the filter form with a doctor name from fixture
    cy.get("@mockData").then((mockData: any) => {
      const doctorName = mockData.doctors[0].surname;

      cy.getByTestId("doctor-name-input").type(doctorName);
      cy.getByTestId("filter-submit-button").click();

      // Wait for the API request to complete
      cy.wait("@filterDoctors");

      // Verify filtered results
      cy.getByTestId("doctors-list").should("be.visible");
      cy.getByTestId("doctor-item").should("contain", doctorName);
    });
  });
  it("should navigate to doctor details when clicking on a doctor", () => {
    // Click on the first doctor in the list
    cy.getByTestId("doctor-item")
      .first()
      .then(($el) => {
        // Store doctor name for later verification
        const doctorName = $el.find('[data-cy="doctor-name"]').text();

        cy.log(`Doctor Name: ${doctorName}`);

        // Click on the doctor item
        cy.wrap($el).click();

        // Wait for the doctor details API call to complete
        cy.wait("@getDoctor");
        cy.wait("@filterPatients"); // Check that we're on a doctor detail page
        cy.url().should("include", "/doctors/");

        // The page should contain doctor information
        cy.getByTestId("doctor-details-title").should("be.visible");

        // Verify that the correct doctor information is displayed
        cy.getByTestId("doctor-header").contains(doctorName).should("be.visible");
      });
  });
});
