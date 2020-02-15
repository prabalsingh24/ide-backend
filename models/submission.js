"use strict";

module.exports = (sequelize, DataTypes) => {
  var submission = sequelize.define(
    "submission",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
