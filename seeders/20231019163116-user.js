'use strict';
const { User } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Syifa',
        address: 'Depok',
        age: 21,
        role: 'Super admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Shani',
        address: 'Yogya',
        age: 25,
        role: 'Super admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jessica',
        address: 'Tangerang',
        age: 18,
        role: 'Super admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = await User.findAll();

    await queryInterface.bulkInsert(
      'Auths',
      [
        {
          email: 'syifa@gmail.com',
          password:
            '$2a$12$9j6wTBoYh.A6/Qi85gLORuAM6ekvTuWM9FFft1EsIJgKYP7/YaEpq',
          confirmPassword:
            '$2a$12$9j6wTBoYh.A6/Qi85gLORuAM6ekvTuWM9FFft1EsIJgKYP7/YaEpq',
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'shani@gmail.com',
          password:
            '$2a$12$kSVktv0Y12Vhw7qfohfnmui1SYEhOH6VNAgsBnOeGpeb3xV6arIKG',
          confirmPassword:
            '$2a$12$kSVktv0Y12Vhw7qfohfnmui1SYEhOH6VNAgsBnOeGpeb3xV6arIKG',
          userId: users[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'jessica@gmail.com',
          password:
            '$2a$12$h.sUmSMrVn/dNhBJ53w5FOfsz7rIGGvx2LH.nO3v9/Ad5.N7/BEJ2',
          confirmPassword:
            '$2a$12$h.sUmSMrVn/dNhBJ53w5FOfsz7rIGGvx2LH.nO3v9/Ad5.N7/BEJ2',
          userId: users[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Auths', null, {});
  },
};
