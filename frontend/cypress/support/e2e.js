import './commands';

// Desactivar las advertencias de excepciones no manejadas
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
}); 