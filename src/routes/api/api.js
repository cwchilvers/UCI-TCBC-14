const router = require('express').Router();

// Routers
const routers = {
    userRouter: require('./api-user_routes'),
    postRouter: require('./api-post_routes')
}

// Routes
router
    .use('/users', routers.userRouter)
    .use('/posts', routers.postRouter);

module.exports = router;