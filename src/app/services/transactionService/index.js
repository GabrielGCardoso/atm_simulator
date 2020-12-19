const TransactionRepository = require('src/infra/repository/TransactionRepository');

class TransactionService {
    constructor() {
        this.repository = new TransactionRepository();
    }

    async create(data) {
        return this.repository.create(data);
    }
}

module.exports = TransactionService;
