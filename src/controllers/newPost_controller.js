// Create a new post
module.exports = async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            // If user is not logged in, redirect to the login page
            return res.redirect('/login');
        }

        const userId = req.session.userId; // Get the currently logged-in user ID from the session
        const title = 'BTB | New Post'; // Set the page title

        res.render('newPost', { title, loggedIn: req.session.loggedIn, userId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });    // Send error message to client
    }
};