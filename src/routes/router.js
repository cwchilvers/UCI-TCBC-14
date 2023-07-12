const router = require('express').Router();

// API Routes
const apiRoutes = require('./api/api');
router.use('/api', apiRoutes);

// Controllers
const home = require('../controllers/home_controller');
const dashboard = require('../controllers/dashboard_controller');
const login = require('../controllers/login_controller');
const signUp = require('../controllers/signUp_controller');
const notFound = require('../controllers/notFound_controller');
const newPost = require('../controllers/newPost_controller');

// Home page
router.get('/', async (req, res) => {
    home(req, res);
});

// Dashboard page
router.get('/dashboard', async (req, res) => {
    dashboard(req, res);
});

// Login page
router.get('/login', async (req, res) => {
    login(req, res);
});

// Sign-up page
router.get('/sign-up', async (req, res) => {
    signUp(req, res);
});

// New post page
router.get('/new-post', async (req, res) => {
    newPost(req, res);
});

// Page not found
router.use((req, res) => {
    notFound(req, res);
});

module.exports = router;