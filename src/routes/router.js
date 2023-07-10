const router = require('express').Router();

// Controllers
const home = require('../controllers/home_controller');
const dashboard = require('../controllers/dashboard_controller');
const login = require('../controllers/login_controller');
const notFound = require('../controllers/notFound_controller');

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

// Page not found
router.use((req, res) => {
    notFound(req, res);
});

module.exports = router;