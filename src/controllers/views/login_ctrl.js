module.exports = async (req, res) => {
    // If user is logged in, redirect to home page
    if (req.session.loggedIn) {
        return res.redirect('/dashboard');
    } else {        
        // Render login page with title
        res.render('login', { title: 'BTB | Login' }); 
    }
};