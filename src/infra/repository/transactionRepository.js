const Repository = require('./repository.js');
const { transactions } = require('../mysql/models');

class TransactionRepository extends Repository {
    constructor() {
        super(transactions);
    }

    async create(accountData) {
        try {
            return await super.create(accountData);
        } catch (error) {
            console.log("TransactionRepository Error:",error);
            //business error
            // throw new Error('invalid data to create account');
        }
    }
}

module.exports = TransactionRepository;
