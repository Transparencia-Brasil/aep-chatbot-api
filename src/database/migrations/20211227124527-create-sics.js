'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sics', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uf: Sequelize.DataTypes.STRING,
      nivel: Sequelize.DataTypes.STRING,
      orgao: Sequelize.DataTypes.STRING,
      especifico: Sequelize.DataTypes.STRING,
      link: Sequelize.DataTypes.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sics');
  }
};
