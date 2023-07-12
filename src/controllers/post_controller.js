const { Post, User, Comment } = require('../models/models');
const { format_time, format_date } = require('../utils/formatDate');

// Render selected post and comments
module.exports = async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            // If user is not logged in, redirect to the login page
            return res.redirect('/login');
        }



        const post = await Post.findByPk(req.params.id, {
            include: User,      // Include the User model to get the author information
            attributes: ['id', 'title', 'content', 'createdAt'],    // Add attributes to retrieve from the Post model
            raw: true,          // Retrieve plain data instead of Sequelize instances
            nest: true          // This fixed username not passing through to the view
        });

        const title = 'BTB | ' + post.title;   // Set the page title

        // Format the date for each post
        const formattedPost = {
            ...post,
            createdAt: {                                        // Create object for createdAt attribute
                formattedTime: format_time(post.createdAt),     // Format the time
                formattedDate: format_date(post.createdAt)      // Format the date
            }
        };

        // get all comments from post
        const comments = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: User,      // Include the User model to get the author information
            order: [['createdAt', 'DESC']],                // Order comments by creation date in descending order
            attributes: ['id', 'content', 'createdAt'],    // Add attributes to retrieve from the Post model
            raw: true,          // Retrieve plain data instead of Sequelize instances
            nest: true          // This fixed username not passing through to the view
        });

        // Format the date for each comment
        const formattedComments = comments.map(comment => ({
            ...comment,
            createdAt: {                                        // Create object for createdAt attribute
                formattedTime: format_time(comment.createdAt),     // Format the time
                formattedDate: format_date(comment.createdAt)      // Format the date
            }
        }));

        console.log(formattedComments);

        

        res.render('singlePost', { title, post: formattedPost, comments: formattedComments, loggedIn: req.session.loggedIn }); // Render the 'home' view and pass the posts data and title to the view







    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });    // Send error message to client
    }
};