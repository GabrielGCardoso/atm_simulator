const TransactionRepository = require('src/infra/repository/transactionRepository');
const StateMachineService = require('src/app/services/stateMachineService');
const TransactionTypesEnum = require('src/app/services/transactionService/transactionTypesEnum');
const { Errors, Exceptions } = require('src/infra/exceptions');

class TransactionService {
    constructor() {
        this.repository = new TransactionRepository();
        this.stateMachine = new StateMachineService();
        this.transactionTypesEnum = TransactionTypesEnum;
    }

    async credit(account_id, amount) {
        return this.repository.create({
            account_id,
            amount,
            type: this.transactionTypesEnum.INCOMING,
        });
    }

    async debit(account_id, amount) {
        if (await this.stateMachine.isInCriticalZoneAccount(account_id))
            throw Exceptions.business(Errors.ACCOUNT_IN_CRITICAL_ZONE);

        const result = this.repository.create({
            account_id,
            amount,
            type: this.transactionTypesEnum.OUTGOING,
        });

        await this.stateMachine.freeCriticalZoneAccount(account_id);
        return result;
    }

    async create(data) {
        return this.repository.create(data);
    }

    async getBalance(account_id) {
        try {
            const incoming =
                (await this.repository.sumTransactionByType(
                    account_id,
                    this.transactionTypesEnum.INCOMING
                )) || 0;

            const outgoing =
                (await this.repository.sumTransactionByType(
                    account_id,
                    this.transactionTypesEnum.OUTGOING
                )) || 0;
            return incoming - outgoing;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = TransactionService;
