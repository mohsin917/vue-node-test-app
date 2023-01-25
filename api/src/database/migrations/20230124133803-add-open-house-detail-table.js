'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_open_house_details', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      open_house_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'tbl_open_houses',
          key: 'id'
        },
      },
      property_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'tbl_properties',
          key: 'id'
        },
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'tbl_users',
          key: 'id'
        },
      },
      tenant_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      updated_by: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_open_house_details');
  }
};
