"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("TransactionItems", "TransactionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Transactions",
        key: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addColumn("TransactionItems", "ProductId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("TransactionItems", "TransactionId");
    await queryInterface.removeColumn("TransactionItems", "ProductId");
  },
};
