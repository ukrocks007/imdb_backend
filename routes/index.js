const userRoutes = require('./user');
const adminRoutes = require('./admin');
const uploadRoutes = require('./upload');
const movieRoutes = require('./movie');
const ratingRoutes = require('./rating');

module.exports = (app) => {
    app.use('/api/v1', userRoutes);
    app.use('/api/v1', adminRoutes);
    app.use('/api/v1', uploadRoutes);
    app.use('/api/v1', movieRoutes);
    app.use('/api/v1', ratingRoutes);
}