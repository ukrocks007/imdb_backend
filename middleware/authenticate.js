const jwt = require('jsonwebtoken');
const config = require('../config');
module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, config.jwtSecret, (error, user) => {
            if (error) {
                res.status(401).json({
                    success: false,
                    message: 'Forebidden user access',
                });
                return res;
            }
            req.user = user;
            next();
        });
    } catch (ex) {
        res.status(401).json({
            success: false,
            message: 'Error authenticating user',
        });
    }
}