'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cursos', [{
      nombreCurso: 'First Year',
      profesorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      nombreCurso: 'Second Year',
      profesorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      nombreCurso: 'Third Year',
      profesorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      nombreCurso: 'Fourth Year',
      profesorId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      nombreCurso: 'Fifth Year',
      profesorId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      nombreCurso: 'Superior',
      profesorId: 3,
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
