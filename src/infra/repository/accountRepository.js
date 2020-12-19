const Repository = require('./repository.js');
const { accounts } = require('../mysql/models');

class AccountRepository extends Repository {
    constructor() {
        super(accounts);
    }

    async create(accountData) {
        try {
            return await super.create(accountData);
        } catch (error) {
            console.error('UserRepository Error:', error);
            //business error
            // throw new Error('invalid data to create account');
        }
    }
}

module.exports = AccountRepository;
