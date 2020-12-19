'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('transactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            account_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'accounts',
                    key: 'id',
                },
            },
            amount: {
                allowNull: false,
                type: Sequelize.NUMERIC,
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
        return queryInterface.dropTable('transactions');
    },
};
