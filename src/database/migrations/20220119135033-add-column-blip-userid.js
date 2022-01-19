'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pedidos', 'blip_userid', { type: Sequelize.DataTypes.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('pedidos', 'blip_userid');
  }
};
