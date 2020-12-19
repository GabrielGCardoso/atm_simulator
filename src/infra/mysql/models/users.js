'use strict';

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cpf: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            birthday_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {}
    );
    users.associate = function (models) {
        users.belongsTo(models.accounts);
    };
    return users;
};
