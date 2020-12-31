const Repository = require('./repository.js');
const { state_machine } = require('../mysql/models');

class StateMachineRepository extends Repository {
    constructor() {
        super(state_machine);
    }

    async isInCriticalZone(entity, id) {
        const count = await super.count({
            where: {
                entity: entity,
                entity_id: id,
            },
        });
        return !!count;
    }

    async removeFromCriticalZone({ entity, entity_id }) {
        return super.destroy({ where: { entity, entity_id } })
    }

    async setCriticalZone(entity, entity_id) {
        await this.create({ entity, entity_id })
    }

    async askSettingCriticalZone({ entity, entity_id }) {
        if (await this.isInCriticalZone(entity, entity_id)) 
            return true;

        await this.setCriticalZone(entity, entity_id);
        return false;
    }
}

module.exports = StateMachineRepository;