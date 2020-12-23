'use strict';
module.exports = (sequelize, DataTypes) => {
  const state_machine = sequelize.define('state_machine', {
    entity: DataTypes.INTEGER,
    entity_id: DataTypes.INTEGER
  }, {});
  state_machine.associate = function(models) {
    // associations can be defined here
  };
  return state_machine;
};