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

    async removeFromCriticalZone({ entity, id }) {
        return super.findOne({ where: { entity, entity_id: id } }).then((row) => {
            return row.destroy();
        });
    }

    async setCriticalZone(entity, id) {
        return this.create({ entity, entity_id: id })
            .then((_) => true)
            .catch((_) => false);
    }

    async askSettingCriticalZone({ entity, id }) {
        if (await this.isInCriticalZone(entity, id)) return false;
        return this.setCriticalZone(entity, id);
    }
}

module.exports = StateMachineRepository;