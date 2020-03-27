'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('submissions', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_successful: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      outputs: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      userId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('submissions')
  }
};
