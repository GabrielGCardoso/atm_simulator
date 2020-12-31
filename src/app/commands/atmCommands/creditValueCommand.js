const TransactionService = require('src/app/services/transactionService');

module.exports = async ({ account_id, incoming }) => {
    return await new TransactionService().credit(account_id, incoming);
};
