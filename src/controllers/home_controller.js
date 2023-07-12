const { Post, User } = require('../models/models');
const { format_time, format_date } = require('../utils/formatDate');

module.exports = async (req, res) => {
    try {
        // Get all posts, order by latest first
        const posts = await Post.findAll({
            include: User, 
            order: [['createdAt', 'DESC']],                    
            attributes: ['id', 'title', 'content', 'createdAt'], 
            raw: true,         
            nest: true       
        });

        // Format the date for each post
        const formattedPosts = posts.map(post => ({
            ...post,
            createdAt: {  
                formattedTime: format_time(post.createdAt), 
                formattedDate: format_date(post.createdAt)
            }
        }));
        
        // Render page and pass data to view
        res.render('home', { 
            title: 'BTB | Home', 
            loggedIn: req.session.loggedIn,
            posts: formattedPosts
        });

    } catch (error) {
        // Send error message to client
        res.status(500).json({ error: 'Failed to retrieve posts' }); 
    }
};