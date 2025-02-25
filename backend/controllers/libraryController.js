const { validationResult } = require('express-validator');
const libraryService = require('../services/libraryService');

class LibraryController {
  async createLibrary(req, res) {
    try {
      // Verificar errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      // Crear la biblioteca
      const library = await libraryService.createLibrary(req.body);

      return res.status(201).json({
        success: true,
        message: 'Biblioteca creada exitosamente',
        data: {
          id: library.id,
          name: library.name
        }
      });

    } catch (error) {
      if (error.message.includes('Ya existe')) {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }

      console.error('Error al crear biblioteca:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
}

module.exports = new LibraryController(); 