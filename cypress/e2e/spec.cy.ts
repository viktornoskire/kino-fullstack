describe('Login', () => {
  it('Login user', () => {
    cy.visit('http://localhost:3000/');
    cy.viewport(1500, 1080);
    cy.get('button').contains('Sign In').click();
    cy.get('#login-email').type('findus.pettson@gmail.com');
    cy.get('#login-password').type('WelcomeToKinoSandviken12--');
    cy.get('.login-form').submit();
    cy.wait(500);
    cy.get('button').contains('Sign Out');
  });
});

describe('Register', () => {
  it('Register user', () => {
    cy.visit('http://localhost:3000/');
    cy.viewport(1500, 1080);
    cy.get('button').contains('Sign In').click();
    cy.get('span').contains('Register').click();
    cy.get('#register-first').type('john   ');
    cy.get('#register-last').type('    dOe  ');
    cy.get('#register-email').type('mailermanny@gmail.com');
    cy.get('#register-phone').type('070 123 45 67');
    cy.get('#register-password').type('WelcomeToKinoSandviken12--');
    cy.get('.register-form').submit();
  });
});
