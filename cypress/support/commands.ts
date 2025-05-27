/* eslint-disable @typescript-eslint/no-namespace */
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit('/');
    cy.get('button').contains('Sign In').click();
    cy.get('form')
      .filter(':visible')
      .find('input[name="email"]')
      .type(username);
    cy.get('form')
      .filter(':visible')
      .find('input[name="password"]')
      .type(password);

    cy.intercept('POST', '/api/auth/callback/credentials').as('login');

    cy.get('form').find('button').contains('Login').click();

    cy.wait('@login');
  });
});

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
  }
}
