'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    account_id:DataTypes.INTEGER,
    amount: DataTypes.NUMERIC,
    type: DataTypes.INTEGER
  }, {});
  transactions.associate = function(models) {
      transactions.hasOne(models.accounts);
  };
  return transactions;
};