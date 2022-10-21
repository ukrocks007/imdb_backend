const dotenv = require('dotenv')
const parsed = dotenv.config().parsed

module.exports = {
    mysqlHost: parsed.MYSQL_HOST || 'localhost',
    mysqlUser: parsed.MYSQL_USER || 'root',
    mysqlPassword: parsed.MYSQL_PASSWORD || 'mysql',
    mysqlPort: parsed.MYSQL_PORT || '3307',
    mysqlDatabase: parsed.MYSQL_DATABASE || 'rationarium',
    SEQUELIZE_LOGS: parsed.SEQUELIZE_LOGS || 'false',
    jwtSecret: parsed.JWT_SECRET || 'secret',
}