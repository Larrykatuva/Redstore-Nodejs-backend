'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('People', [{
        shopName: "Charleen Computers",
        shopDesc: "We sell both new and refurbished computers",
        shopLocation: "Trust building shop NO.15, Moi avenue",
        userId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {});
  }
};
