const router = require('express').Router();

// API
const apiRoutes = require('./api/api');
router.use('/api', apiRoutes);

// Controllers
const controllers = {
    home: require('../controllers/home_controller'),
    dashboard: require('../controllers/dashboard_controller'),
    login: require('../controllers/login_controller'),
    signUp: require('../controllers/signUp_controller'),
    post: require('../controllers/post_controller'),
    newPost: require('../controllers/newPost_controller'),
    notFound: require('../controllers/notFound_controller')
};

// Routes
router
    .get('/', controllers.home)
    .get('/dashboard', controllers.dashboard)
    .get('/login', controllers.login)
    .get('/sign-up', controllers.signUp)
    .get('/:id', controllers.post)
    .get('/new-post', controllers.newPost)
    .use(controllers.notFound);

module.exports = router;