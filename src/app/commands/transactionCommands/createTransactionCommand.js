const TransactionService = require('src/app/services/transactionService');

module.exports = ({ account_id, type, amount }) => {
    return new TransactionService().create({ account_id, type, amount });
};
