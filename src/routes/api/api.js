const router = require('express').Router();

// User routes
const userRoutes = require('./user-routes');
router.use('/users', userRoutes);

// Post routes
const postRoutes = require('./post-routes');
router.use('/posts', postRoutes);

module.exports = router;