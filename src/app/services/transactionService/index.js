const TransactionRepository = require('src/infra/repository/TransactionRepository');
const StateMachineService = require('src/app/services/StateMachineService');

class TransactionService {
    constructor() {
        this.repository = new TransactionRepository();
        this.stateMachine = new StateMachineService();
    }

    async debit(account_id, amount) {
        if (await this.stateMachine.isInCriticalZoneAccount(account_id))
            throw Exception.business(
                'Account in use, if is not you call to bank to report this activity'
            );

        return this.repository
            .create({ account_id, amount, type: 2 })
            .then((result) => {
                this.stateMachine.freeCriticalZoneAccount(account_id);
                return result;
            });
    }

    async create(data) {
        return this.repository.create(data);
    }

    async getBalance(account_id) {
        return this.repository.getBalance(account_id);
    }
}

module.exports = TransactionService;
