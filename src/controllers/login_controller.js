module.exports = async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } else {
        const title = 'BTB | Login';    // Set the page title
        res.render('login', { title }); // Render login page with title
    }
};