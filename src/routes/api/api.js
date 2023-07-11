const router = require('express').Router();

// User routes
const userRoutes = require('./user-routes');
router.use('/users', userRoutes);

module.exports = router;