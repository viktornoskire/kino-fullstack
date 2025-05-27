describe('Test KINO page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
  });

  it('Test that the page is up and running', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'Kino Sandviken');
  });

  it('SESSION', () => {
    cy.request('/api/auth/session').then((resp) => {
      cy.log(JSON.stringify(resp.body));
    });
  });

  it('Sign in as member', () => {
    cy.visit('/member');
    cy.get('h1').should('have.text', 'Member page');
  });
});
