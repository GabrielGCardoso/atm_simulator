const TransactionService = require('src/app/services/transactionService');
const { Errors, Exceptions } = require('src/infra/exceptions');

module.exports = async ({ account_id, outgoing }) => {
    const balance = await new TransactionService().getBalance(account_id);
    if (balance < outgoing) throw Exceptions.business(Errors.INSUFFICIENT_FUNDS);

    return new TransactionService().debit(account_id, outgoing);
};
