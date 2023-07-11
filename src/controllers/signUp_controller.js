module.exports = async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } else {
        const title = 'BTB | Sign-Up';      // Set the page title
        res.render('signUp', { title });    // Render login page with title
    }
};