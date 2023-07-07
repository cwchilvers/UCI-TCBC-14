const router = require('express').Router();
const api_router = require('./api_router');

router.use('/api', api_router);

// Page not found
router.use((req, res) => {
    res.send("<h1>404</h1>")
});

module.exports = router;