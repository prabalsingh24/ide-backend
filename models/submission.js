"use strict";

module.exports = (sequelize, DataTypes) => {
  var submission = sequelize.define(
    "submission",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      judge_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_successful: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      outputs: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      }
    },
    {}
  );

  submission.associate = function(models) {
    submission.belongsTo(models.user, { allowNull: true });
  };

  return submission;
};
