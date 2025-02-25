// Comando para llenar el formulario de biblioteca
Cypress.Commands.add('fillLibraryForm', (libraryData) => {
  cy.get('input[name="name"]').type(libraryData.name);
  cy.get('input[name="address"]').type(libraryData.address);
  cy.get('input[name="phone"]').type(libraryData.phone);
  cy.get('input[name="email"]').type(libraryData.email);
});

// Comando para verificar mensajes de error
Cypress.Commands.add('shouldShowError', (errorMessage) => {
  cy.contains(errorMessage).should('be.visible');
});

// Comando para verificar registro exitoso
Cypress.Commands.add('shouldShowSuccess', () => {
  cy.contains('Biblioteca creada exitosamente').should('be.visible');
}); 