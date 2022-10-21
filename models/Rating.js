const { Sequelize, Model, DataTypes } = require('sequelize');

const Rating = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    movie_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Movies',
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    star: {
        type: DataTypes.STRING,
        allowNull: false
    },
};

module.exports = Rating;