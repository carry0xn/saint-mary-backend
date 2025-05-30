'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Alumnos', [{
        nombreCompleto: 'Gabriel Montenegro',
        cursoId: 2,
        username: 'gabruelite',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        nombreCompleto: 'Alejandra Abigail Nagrelli',
        cursoId: 4,
        username: 'nagrulli',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        nombreCompleto: 'Antonella Natalia Salerno',
        cursoId: 3,
        username: 'tina',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        nombreCompleto: 'Martina Florencia Pacheco',
        cursoId: 4,
        username: 'tone',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
     }], {})
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
