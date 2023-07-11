const { Post, User } = require('../models/models');
const { format_time, format_date } = require('../utils/formatDate');

module.exports = async (req, res) => {
    try {
        const title = 'BTB | Home';   // Set the page title
        const posts = await Post.findAll({
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
        }));

        res.render('home', { title, posts: formattedPosts, loggedIn: req.session.loggedIn }); // Render the 'home' view and pass the posts data and title to the view
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });    // Send error message to client
    }
};