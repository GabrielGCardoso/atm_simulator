const Repository = require('./repository.js');
const { transactions } = require('../mysql/models');
const { Errors, Exceptions } = require('src/infra/exceptions');

class TransactionRepository extends Repository {
    constructor() {
        super(transactions);
    }

    async sumTransactionByType(account_id, transactionType) {
        const result = await super.sum({
            column: 'amount',
            query: {
                group: ['account_id'],
                where: {
                    account_id: account_id,
                    type: transactionType,
                },
            },
        });
        if (result.length <= 0) return null;
        return result[0].dataValues.total_amount;
    }

    async create(accountData) {
        try {
            return await super.create(accountData);
        } catch (error) {
            throw Exceptions.contract(Errors.INVALID_DATA);
        }
    }
}

module.exports = TransactionRepository;
