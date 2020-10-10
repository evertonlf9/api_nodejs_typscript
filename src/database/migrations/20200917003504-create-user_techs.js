'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_techs', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE', //update na tabela em 'CASCADE' (caso o id mudar  reflete a alteração em cascata) ou 'RESTRICT' (restringe a alteração)
        onDelete: 'CASCADE',//delete na tabela em 'CASCADE' (caso o id mudar  reflete a alteração em cascata) ou 'RESTRICT' (restringe a alteração) ou 'SET NULL'
      },
      tech_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'techs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_techs');
  }
};
