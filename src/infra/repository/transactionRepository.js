const Repository = require('./repository.js');
const { transactions } = require('../mysql/models');

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
            console.log('TransactionRepository Error:', error);
            //business error
            // throw new Error('invalid data to create account');
        }
    }
}

module.exports = TransactionRepository;
