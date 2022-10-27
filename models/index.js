const config = require('../config');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const User = require('./User');
const Admin = require('./Admin');
const Movie = require('./Movie');
const Rating = require('./Rating');
const Upload = require('./Upload');

const db = {};

const sequelizeOptions = {
    dialect: 'mysql',
    host: config.mysqlHost,
    port: Number(config.mysqlPort),
};

const sequelize = new Sequelize(
    config.mysqlDatabase,
    config.mysqlUser,
    config.mysqlPassword,
    sequelizeOptions
);

async function initialize() {
    const { mysqlHost, mysqlPort, mysqlUser, mysqlPassword, mysqlDatabase } =
        config;

    let connection = await mysql.createConnection({
        host: mysqlHost,
        port: Number(mysqlPort),
        user: mysqlUser,
        password: mysqlPassword,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${mysqlDatabase}\`;`);

    connection = await mysql.createConnection({
        host: mysqlHost,
        port: Number(mysqlPort),
        user: mysqlUser,
        password: mysqlPassword,
        database: mysqlDatabase,
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }

    try {
        db["User"] = sequelize.define('User', User);
        db["Admin"] = sequelize.define('Admin', Admin);
        db["Movie"] = sequelize.define('Movie', Movie);
        db["Upload"] = sequelize.define('Upload', Upload);
        db["Rating"] = sequelize.define('Rating', Rating);
        await sequelize.sync();
        console.log('Database sync done.');
    } catch (error) {
        console.log('Error to generate the schemas:', error);
    }

    return sequelize;
}

initialize();
module.exports = db;