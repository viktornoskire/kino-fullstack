/* Test strategy */

describe('Login', () => {
  it('Login user', () => {
    cy.visit('/');
    cy.get('button').contains('Sign In').click();
    cy.get('#login-email').type('findus.pettson@gmail.com');
    cy.get('#login-password').type('WelcomeToKinoSandviken12--');
    cy.get('.login-form').submit();
    cy.get('h2').contains('Welcome back!');
  });
  it('Login user failed', () => {
    cy.visit('/');
    cy.get('button').contains('Sign In').click();
    cy.get('#login-email').type('findus.pettson@gmail.com');
    cy.get('#login-password').type('WelcomeToKinoSand');
    cy.get('.login-form').submit();
    cy.get('small').contains('Password incorrect');
  });
});

// Test registration of user
describe('Register', () => {
  it('Register user', () => {
    cy.intercept('POST', '/api/register', {
      statusCode: 201,
      body: { created: true, message: 'User created successfully' },
    }).as('mockRegister');

    cy.visit('/');
    cy.get('button').contains('Sign In').click();
    cy.get('span').contains('Register').click();
    cy.get('#register-first').type('john   ');
    cy.get('#register-last').type('    dOe  ');
    cy.get('#register-email').type('mail@gmail.com');
    cy.get('#register-phone').type('070 123 45 67');
    cy.get('#register-password').type('WelcomeToKinoSandviken12--');
    cy.get('.register-form').submit();
    cy.wait('@mockRegister');

    cy.get('h2').contains('Welcome to the club!');
  });
  it('Register user failed', () => {
    cy.visit('/');
    cy.get('button').contains('Sign In').click();
    cy.get('span').contains('Register').click();
    cy.get('#register-first').type('John');
    cy.get('#register-last').type('Doe');
    cy.get('#register-email').type('mail@gmail.com');
    cy.get('#register-phone').type('onehundredandtwentytwo');
    cy.get('#register-password').type('WelcomeToKinoSandviken12--');
    cy.get('.register-form').submit();

    cy.get('small').contains('Invalid phone number');
  });
});

// Test registering user and mocked login data
describe('Register and Login', () => {
  it('Register and Login user', () => {
    cy.intercept('POST', '/api/register', {
      statusCode: 201,
      body: { created: true, message: 'User created successfully' },
    }).as('mockRegister');

    cy.visit('/');
    cy.get('button').contains('Sign In').click();
    cy.get('span').contains('Register').click();
    cy.get('#register-first').type('john   ');
    cy.get('#register-last').type('    dOe  ');
    cy.get('#register-email').type('mail@gmail.com');
    cy.get('#register-phone').type('070 123 45 67');
    cy.get('#register-password').type('WelcomeToKinoSandviken12--');
    cy.get('.register-form').submit();

    cy.wait('@mockRegister');

    cy.get('h2').contains('Welcome to the club!');

    cy.get(':nth-child(4) > .underline').contains('Login').click();
    cy.intercept('POST', '/api/auth/callback/credentials', {
      statusCode: 200,
      body: {
        url: 'http://localhost:3000/',
      },
    }).as('nextAuthLogin');

    cy.get('#login-email').type('mail@gmail.com');
    cy.get('#login-password').type('WelcomeToKinoSandviken12--');
    cy.get('.login-form').submit();

    cy.wait('@nextAuthLogin');

    cy.get('h2').contains('Welcome back!');
  });
});
