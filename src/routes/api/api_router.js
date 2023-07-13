const router = require('express').Router();

// Routers
const routers = {
    userRouter: require('./api-user_router'),
    postRouter: require('./api-post_router')
}

// Routes
router
    .use('/users', routers.userRouter)
    .use('/posts', routers.postRouter);

module.exports = router;