const { Post, User } = require('../models/models');
const { format_time, format_date } = require('../utils/formatDate');

module.exports = async (req, res) => {
    try {
        // If user isn't logged in, redirect to login page
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        // Get all posts by the logged in user, order by latest first
        const posts = await Post.findAll({
            where: { user_id: req.session.userId }, 
            include: User,
            order: [['createdAt', 'DESC']], 
            attributes: ['id', 'title', 'content', 'createdAt'],
            raw: true,  
            nest: true   
        });

        // Format the date for each post
        const formattedPosts = posts.map(post => ({
            ...post,
            createdAt: {                                        // Create object for createdAt attribute
                formattedTime: format_time(post.createdAt),     // Format the time
                formattedDate: format_date(post.createdAt)      // Format the date
            }
        })); 

        // Render page and pass data to view
        res.render('dashboard', { 
            title: 'BTB | Dashboard',
            loggedIn: req.session.loggedIn,
            posts: formattedPosts
        });

    } catch (error) {
        // Send error message to client
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
};