const AccountRepository = require('src/infra/repository/accountRepository');

class AccountService {
    constructor() {
        this.repository = new AccountRepository();
    }

    async create({ user_id, type }) {
        return this.repository.create({ user_id, type });
    }
}

module.exports = AccountService;
