"use strict";
const fs = require("fs").promises;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(await fs.readFile("./products.json", "utf8")).map(
      (el) => {
        delete el.id;
        el.createdAt = el.updatedAt = new Date();
        return el;
      },
    );

    await queryInterface.bulkInsert("Products", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
