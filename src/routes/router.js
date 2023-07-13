const router = require('express').Router();

// API
const apiRoutes = require('./api/api_router');
router.use('/api', apiRoutes);

// View Controllers
const viewCtrl = {
    home: require('../controllers/views/home_ctrl'),
    dashboard: require('../controllers/views/dashboard_ctrl'),
    login: require('../controllers/views/login_ctrl'),
    signUp: require('../controllers/views/signUp_ctrl'),
    post: require('../controllers/views/post_ctrl'),
    newPost: require('../controllers/views/newPost_ctrl'),
    notFound: require('../controllers/views/notFound_ctrl')
};

// Routes
router
    .get('/', viewCtrl.home)
    .get('/dashboard', viewCtrl.dashboard)
    .get('/login', viewCtrl.login)
    .get('/sign-up', viewCtrl.signUp)
    .get('/new-post', viewCtrl.newPost)
    .get('/:id', viewCtrl.post)
    .use(viewCtrl.notFound);

module.exports = router;