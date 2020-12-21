const TransactionRepository = require('src/infra/repository/TransactionRepository');

class TransactionService {
    constructor() {
        this.repository = new TransactionRepository();
    }

    async debit(account_id, amount) {
        return this.repository.create({ account_id, amount, type: 2 });
    }

    async create(data) {
        return this.repository.create(data);
    }

    async getBalance(account_id) {
        return this.repository.getBalance(account_id);
    }
}

module.exports = TransactionService;
