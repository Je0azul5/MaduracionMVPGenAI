describe('Email Confirmation Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('POST', `${Cypress.env('apiUrl')}/api/libraries`).as('createLibrary');
  });

  it('should handle successful email sending', () => {
    const libraryData = {
      name: 'Biblioteca Email Test',
      address: 'Calle Email 123',
      phone: '+1234567890',
      email: 'email@test.com'
    };

    // Interceptar la llamada al servicio de correo
    cy.intercept('POST', '**/send-email', {
      statusCode: 200,
      body: { success: true }
    }).as('sendEmail');

    // Llenar y enviar el formulario
    cy.get('input[name="name"]').type(libraryData.name);
    cy.get('input[name="address"]').type(libraryData.address);
    cy.get('input[name="phone"]').type(libraryData.phone);
    cy.get('input[name="email"]').type(libraryData.email);
    cy.get('button[type="submit"]').click();

    // Verificar que se envió el correo
    cy.wait(['@createLibrary', '@sendEmail']).then((interceptions) => {
      expect(interceptions[0].response.statusCode).to.equal(201);
      expect(interceptions[1].response.statusCode).to.equal(200);
    });
  });

  it('should handle email service failure gracefully', () => {
    // Simular fallo en el servicio de correo
    cy.intercept('POST', '**/send-email', {
      statusCode: 500,
      body: { success: false }
    }).as('sendEmailError');

    // El registro debe completarse aunque falle el envío del correo
    cy.get('input[name="name"]').type('Biblioteca Test');
    cy.get('input[name="address"]').type('Dirección Test');
    cy.get('input[name="phone"]').type('+1234567890');
    cy.get('input[name="email"]').type('test@biblioteca.com');
    cy.get('button[type="submit"]').click();

    // Verificar que el registro se completó a pesar del error en el correo
    cy.contains('Biblioteca creada exitosamente').should('be.visible');
  });
}); 