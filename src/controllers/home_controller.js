const { Post, User } = require('../models/models');

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
        res.render('home', { title, posts }); // Render the 'home' view and pass the posts data to the view
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });    // Send error message to client
    }
};