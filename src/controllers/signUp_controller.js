module.exports = async (req, res) => {
    // If user is logged in, redirect to home page
    if (req.session.loggedIn) {
        return res.redirect('/');
    } else {
        // Render page and pass data to view
        res.render('signUp', { title: 'BTB | Sign-Up' });
    }
};