const { Sequelize, Model, DataTypes } = require('sequelize');

const Admin = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(512),
        allowNull: true
    },
};

module.exports = Admin;