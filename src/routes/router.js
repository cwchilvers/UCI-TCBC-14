const router = require('express').Router();

// Controllers
const home = require('../controllers/home_controller');
const notFound = require('../controllers/notFound_controller');

// Home page
router.get('/', async (req, res) => {
    res.render('layouts/main');
});

// Page not found
router.use((req, res) => {
    notFound(req, res);
});

module.exports = router;