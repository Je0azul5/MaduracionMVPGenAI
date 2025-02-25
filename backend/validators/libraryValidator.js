const { body } = require('express-validator');

const validateLibrary = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
  
  body('address')
    .notEmpty().withMessage('La dirección es obligatoria'),
  
  body('phone')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .matches(/^\+?[\d\s-]+$/).withMessage('Formato de teléfono inválido'),
  
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Formato de email inválido'),
  
  body('openingHours')
    .notEmpty().withMessage('El horario es obligatorio')
    .isObject().withMessage('El horario debe ser un objeto válido')
];

module.exports = {
  validateLibrary
}; 