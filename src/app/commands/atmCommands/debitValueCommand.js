const TransactionService = require('src/app/services/transactionService');
const ATMService = require('src/app/services/atm_service');
const { Errors, Exceptions } = require('src/infra/exceptions');

module.exports = async ({ account_id, outgoing }) => {
    const balance = await new TransactionService().getBalance(account_id);
    if (balance < outgoing) throw Exceptions.business(Errors.INSUFFICIENT_FUNDS);
    if (!new ATMService().hasEnoughFunds(outgoing))
        throw Exceptions.business(Errors.INSUFFICIENT_CASH);

    return new TransactionService().debit(account_id, outgoing);
};
