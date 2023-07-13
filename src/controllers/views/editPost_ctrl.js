const { Post } = require('../../models/models');

module.exports = async (req, res) => {
    try {
        // If user isn't logged in, redirect to login page
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        // Find the post by ID
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            // If post is not found
            return res.status(404).json({ error: 'Post not found' });
        }

        // Render the edit post page and pass the post data to the view
        res.render('posts/editPost', { 
            title: 'BTB | Edit Post',
            id: req.params.id,
            loggedIn: req.session.loggedIn,
            post: post.toJSON()  // Pass the post data as JSON object
        });

    } catch (error) {
        // Send error message to client
        res.status(500).json({ error: 'Failed to load Edit Post' });
    }
};