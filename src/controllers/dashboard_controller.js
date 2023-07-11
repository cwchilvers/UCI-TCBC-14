const { Post, User } = require('../models/models');
const { format_time, format_date } = require('../utils/formatDate');

module.exports = async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            // If user is not logged in, redirect to the login page
            return res.redirect('/login');
        }

        const title = 'BTB | Dashboard';    // Set the page title
        const userId = req.session.userId;  // Get the user id from the session

        const posts = await Post.findAll({
            where: { user_id: userId },  // Get all posts where userId matches the session's userId
            include: User,      // Include the User model to get the author information
            order: [['createdAt', 'DESC']],                         // Order posts by creation date in descending order
            attributes: ['id', 'title', 'content', 'createdAt'],    // Add attributes to retrieve from the Post model
            raw: true,          // Retrieve plain data instead of Sequelize instances
            nest: true          // This fixed username not passing through to the view
        });

        // Format the date for each post
        const formattedPosts = posts.map(post => ({
            ...post,
            createdAt: {                                        // Create object for createdAt attribute
                formattedTime: format_time(post.createdAt),     // Format the time
                formattedDate: format_date(post.createdAt)      // Format the date
            }
        }));;

        res.render('dashboard', { title, posts: formattedPosts, loggedIn: req.session.loggedIn }); // Render the 'dashboard' view and pass the posts data and title to the view
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });    // Send error message to client
    }
};