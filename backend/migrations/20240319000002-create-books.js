'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      publishYear: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('available', 'borrowed', 'maintenance'),
        defaultValue: 'available'
      },
      libraryId: {
        type: Sequelize.UUID,
        references: {
          model: 'Libraries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  }
}; 