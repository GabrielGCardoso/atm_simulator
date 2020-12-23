const StateMachineRepository = require('src/infra/repository/stateMachineRepository');

class StateMachineService {
    constructor() {
        this.repository = new StateMachineRepository();
        this.entityEnum = {
            ACCOUNT: 1,
        };
    }

    async isInCriticalZoneAccount(account_id) {
        return this.repository.askSettingCriticalZone({
            id: account_id,
            entity: this.entityEnum.ACCOUNT,
        });
    }

    async freeCriticalZoneAccount(account_id) {
        return this.repository.removeFromCriticalZone({
            id: account_id,
            entity: this.entityEnum.ACCOUNT,
        });
    }
}

module.exports = StateMachineService;
