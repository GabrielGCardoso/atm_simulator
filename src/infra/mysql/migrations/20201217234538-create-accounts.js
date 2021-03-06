'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('accounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            type: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface /*, Sequelize*/) => {
        return queryInterface.dropTable('accounts');
    },
};
