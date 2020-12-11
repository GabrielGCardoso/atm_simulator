class Repository {
    constructor(entity) {
        this.entity = entity;
    }

    /**
     *
     * @param {values} data needed to create an entity
     * @return {Object} an entity created
     */
    async create(values) {
        return this.entity.create(values)
    }
}
module.exports = Repository;
