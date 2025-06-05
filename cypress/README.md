# Cypress E2E Testing

This directory contains end-to-end tests for the application using Cypress.

## Running Tests

You can run the tests using the following npm scripts:

- `npm run cypress` - Opens the Cypress Test Runner UI
- `npm run cypress:run` - Runs Cypress tests headlessly in the command line
- `npm run test:e2e` - Starts the development server and opens Cypress Test Runner
- `npm run test:e2e:headless` - Starts the development server and runs tests headlessly

## Test Structure

- `e2e/*.cy.ts` - Test files for different features
- `support/commands.ts` - Custom commands for Cypress
- `support/e2e.ts` - Global configuration for tests
- `fixtures/` - Test data files

## Best Practices

1. Use `data-testid` attributes for selecting elements to make tests more resilient to UI changes
2. Use custom commands when repeating the same test steps
3. Keep test files focused on specific features or user flows
4. Use fixtures for test data rather than hardcoding it in tests
5. Write tests that are independent and don't rely on the state from other tests

## Adding New Tests

To add a new test file:

1. Create a new file in the `e2e/` directory with the `.cy.ts` extension
2. Import any required dependencies
3. Use the `describe` and `it` functions to structure your tests
4. Run the tests to verify they work as expected

## Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
