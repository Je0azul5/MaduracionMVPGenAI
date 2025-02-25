const { Library } = require('../models');
const emailService = require('./emailService');

class LibraryService {
  async createLibrary(libraryData) {
    try {
      const library = await Library.create(libraryData);
      
      // Enviar correo de confirmación
      try {
        await emailService.sendLibraryConfirmation(library);
      } catch (emailError) {
        console.error('Error al enviar correo de confirmación:', emailError);
        // No detenemos el flujo si falla el envío del correo
      }

      return library;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.fields.email) {
          throw new Error('Ya existe una biblioteca con ese email');
        }
        if (error.fields.name) {
          throw new Error('Ya existe una biblioteca con ese nombre');
        }
      }
      throw error;
    }
  }
}

module.exports = new LibraryService(); 