module.exports = async (req, res) => {
    try {
        // If user isn't logged in, redirect to login page
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        // Render page and pass data to view
        res.render('newPost', { title: 'BTB | New Post', loggedIn: req.session.loggedIn});
    } catch (error) {
        // Send error message to client
        res.status(500).json({ error: 'Failed to load Create New Post' });
    }
};