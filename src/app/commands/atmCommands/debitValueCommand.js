const TransactionService = require('src/app/services/transactionService');

module.exports = async ({ account_id, outgoing }) => {
    const balance = await new TransactionService().getBalance(account_id);
    if (balance < outgoing)
        throw new Error(`insufficient value in your account, actual balance ${balance}`);

    return new TransactionService().debit(account_id, outgoing);
};
