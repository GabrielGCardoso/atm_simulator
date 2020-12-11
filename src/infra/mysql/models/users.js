'use strict';
const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize/*, DataTypes */) => {
    const Users = sequelize.define(
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
    Users.associate = function (models) {
        // associations can be defined here
    };
    return Users;
};
