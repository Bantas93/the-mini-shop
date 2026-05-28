'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Transactions",
      "status",
      {
        type: Sequelize.STRING,
        defaultValue: "cart"
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Transactions",
      "status"
    )
  }
};
