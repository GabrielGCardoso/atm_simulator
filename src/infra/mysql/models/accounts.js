'use strict';
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    user_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {});
  accounts.associate = function(models) {
    accounts.hasOne(models.users);
    accounts.belongsTo(models.transactions);
  };
  return accounts;
};