module.exports = async (req, res) => {
    const title = 'BTB | Dashboard';    // Set the page title
    res.render('dashboard', { title, loggedIn: req.session.loggedIn }); // Render dashboard page with title
};