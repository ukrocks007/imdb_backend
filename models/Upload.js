const { Sequelize, Model, DataTypes } = require('sequelize');

const Upload = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    file: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    }
};

module.exports = Upload;