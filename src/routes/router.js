const router = require('express').Router();

// API Routes
const apiRoutes = require('./api/api_router');
router.use('/api', apiRoutes);

// Post Routes
const postRoutes = require('./post_router');
router.use('/post', postRoutes);

// View Controllers
const viewCtrl = {
    home: require('../controllers/views/home_ctrl'),
    dashboard: require('../controllers/views/dashboard_ctrl'),
    login: require('../controllers/views/login_ctrl'),
    signUp: require('../controllers/views/signUp_ctrl'),
    notFound: require('../controllers/views/notFound_ctrl')
};

// Routes
router
    .get('/', viewCtrl.home)
    .get('/dashboard', viewCtrl.dashboard)
    .get('/login', viewCtrl.login)
    .get('/sign-up', viewCtrl.signUp)
    .use(viewCtrl.notFound);

module.exports = router;