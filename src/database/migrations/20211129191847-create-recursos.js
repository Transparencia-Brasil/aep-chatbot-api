'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recursos', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      termo: Sequelize.DataTypes.STRING,
      descricao: Sequelize.DataTypes.STRING,
      descricao_longa: Sequelize.DataTypes.STRING,
      alternativa: Sequelize.DataTypes.STRING,
      recurso: Sequelize.DataTypes.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recursos');
  }
};
