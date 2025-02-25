describe('Library Registration Flow', () => {
  beforeEach(() => {
    // Visitar la página principal antes de cada prueba
    cy.visit('/');
    
    // Interceptar las llamadas a la API
    cy.intercept('POST', `${Cypress.env('apiUrl')}/api/libraries`).as('createLibrary');
  });

  it('should successfully register a new library', () => {
    const libraryData = {
      name: 'Biblioteca Central Test',
      address: 'Calle Test 123',
      phone: '+1234567890',
      email: 'test@biblioteca.com'
    };

    // Llenar el formulario
    cy.get('input[name="name"]').type(libraryData.name);
    cy.get('input[name="address"]').type(libraryData.address);
    cy.get('input[name="phone"]').type(libraryData.phone);
    cy.get('input[name="email"]').type(libraryData.email);

    // Los horarios ya vienen con valores por defecto

    // Enviar el formulario
    cy.get('button[type="submit"]').click();

    // Esperar la respuesta de la API
    cy.wait('@createLibrary').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
      expect(interception.response.body.success).to.be.true;
    });

    // Verificar mensaje de éxito
    cy.contains('Biblioteca creada exitosamente').should('be.visible');
  });

  it('should show validation errors for empty fields', () => {
    // Intentar enviar el formulario vacío
    cy.get('button[type="submit"]').click();

    // Verificar mensajes de error
    cy.contains('El nombre es obligatorio').should('be.visible');
    cy.contains('La dirección es obligatoria').should('be.visible');
    cy.contains('El teléfono es obligatorio').should('be.visible');
    cy.contains('El email es obligatorio').should('be.visible');
  });

  it('should handle duplicate library name', () => {
    // Simular error de biblioteca duplicada
    cy.intercept('POST', `${Cypress.env('apiUrl')}/api/libraries`, {
      statusCode: 409,
      body: {
        success: false,
        message: 'Ya existe una biblioteca con ese nombre'
      }
    }).as('createDuplicateLibrary');

    // Llenar y enviar el formulario
    cy.get('input[name="name"]').type('Biblioteca Duplicada');
    cy.get('input[name="address"]').type('Dirección Test');
    cy.get('input[name="phone"]').type('+1234567890');
    cy.get('input[name="email"]').type('test@biblioteca.com');
    cy.get('button[type="submit"]').click();

    // Verificar mensaje de error
    cy.contains('Ya existe una biblioteca con ese nombre').should('be.visible');
  });

  it('should validate email format', () => {
    // Intentar registrar con email inválido
    cy.get('input[name="name"]').type('Biblioteca Test');
    cy.get('input[name="address"]').type('Dirección Test');
    cy.get('input[name="phone"]').type('+1234567890');
    cy.get('input[name="email"]').type('emailinvalido');
    cy.get('button[type="submit"]').click();

    // Verificar mensaje de error de formato
    cy.contains('Email inválido').should('be.visible');
  });

  it('should handle network errors', () => {
    // Simular error de red
    cy.intercept('POST', `${Cypress.env('apiUrl')}/api/libraries`, {
      forceNetworkError: true
    }).as('networkError');

    // Llenar y enviar el formulario
    cy.get('input[name="name"]').type('Biblioteca Test');
    cy.get('input[name="address"]').type('Dirección Test');
    cy.get('input[name="phone"]').type('+1234567890');
    cy.get('input[name="email"]').type('test@biblioteca.com');
    cy.get('button[type="submit"]').click();

    // Verificar mensaje de error de conexión
    cy.contains('Error de conexión').should('be.visible');
  });
}); 