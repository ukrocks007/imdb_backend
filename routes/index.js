const userRoutes = require('./user');
const adminRoutes = require('./admin');

module.exports = (app) => {
    app.use('/api/v1', userRoutes);
    app.use('/api/v1', adminRoutes);
}