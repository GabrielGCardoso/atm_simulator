const Repository = require('./repository.js');
const { transactions } = require('../mysql/models');

class TransactionRepository extends Repository {
    constructor() {
        super(transactions);
        this.enumTransactionTypes = {
            INCOMING: 1,
            OUTGOING: 2,
        };
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

    async getBalance(account_id) {
        try {
            const incoming =
                (await this.sumTransactionByType(
                    account_id,
                    this.enumTransactionTypes.INCOMING
                )) || 0;

            const outgoing =
                (await this.sumTransactionByType(
                    account_id,
                    this.enumTransactionTypes.OUTGOING
                )) || 0;
            return incoming - outgoing;
        } catch (error) {
            console.error(error);
        }
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
