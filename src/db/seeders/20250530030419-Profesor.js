'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Profesores', [{
        nombreCompleto: 'Karina Reyes',
        username: 'karito',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        nombreCompleto: 'Lupe',
        username: 'lupe3',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        nombreCompleto: 'Carolina Rodriguez Medina',
        username: 'carryxn',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
