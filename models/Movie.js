const { Sequelize, Model, DataTypes } = require('sequelize');

const Movie = {
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
    year: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    tags: {
        type: DataTypes.STRING(512),
        allowNull: true
    },
    poster: {
        type: DataTypes.UUID,
        allowNull: true
    }
};

module.exports = Movie;