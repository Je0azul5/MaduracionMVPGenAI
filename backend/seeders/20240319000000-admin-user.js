'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('admin123', 8);
    
    await queryInterface.bulkInsert('Users', [{
      id: '550e8400-e29b-41d4-a716-446655440000', // UUID fijo para desarrollo
      email: 'admin@biblioteca.com',
      password: hashedPassword,
      role: 'admin',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
}; 