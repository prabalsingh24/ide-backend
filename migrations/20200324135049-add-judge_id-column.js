'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('submissions', 'judge_id', {
      type: Sequelize.BIGINT
    }).then(() => 
      queryInterface.sequelize.query(`
        UPDATE submissions SET judge_id = id
      `)
    ).then(() => 
      queryInterface.changeColumn('submissions', 'judge_id', {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
      })
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('submissions', 'judge_id')
  }
};
