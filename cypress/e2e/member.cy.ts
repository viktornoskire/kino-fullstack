describe('Test KINO page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
  });

  it('Test that the page is up and running', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'Kino Sandviken');
  });

  it('Check that session is created', () => {
    cy.request('/api/auth/session').then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body.user.email).to.equal(Cypress.env('USERNAME'));
    });
  });

  it('Check that text is displayed for logged in member', () => {
    cy.visit('/member');
    cy.get('[data-cy="header"]').should('have.text', 'Member page');
    cy.get('[cy-data="email"]').should(
      'have.text',
      `Email: ${Cypress.env('USERNAME')}`
    );
  });
});
