const { Post, User, Comment } = require('../../models/models');
const { format_time, format_date } = require('../../utils/formatDate');

module.exports = async (req, res) => {
    try {
        // Get post by id
        const post = await Post.findByPk(req.params.id, {
            include: User,     
            attributes: ['id', 'title', 'content', 'createdAt'], 
            raw: true,         
            nest: true       
        });

        // Get all comments from post, order by latest first
        const comments = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: User,    
            order: [['createdAt', 'DESC']],            
            attributes: ['id', 'content', 'createdAt'], 
            raw: true,  
            nest: true
        });

        // Format the date for each post
        const formattedPost = {
            ...post,
            createdAt: {                                   
                formattedTime: format_time(post.createdAt), 
                formattedDate: format_date(post.createdAt)
            }
        };

        // Format the date for each comment
        const formattedComments = comments.map(comment => ({
            ...comment,
            createdAt: {                                      
                formattedTime: format_time(comment.createdAt), 
                formattedDate: format_date(comment.createdAt)
            }
        }));

        // Render page and pass data to view
        res.render('singlePost', { 
            title: 'BTB | ' + post.title, 
            loggedIn: req.session.loggedIn,
            post: formattedPost,
            comments: formattedComments, 
            postId: req.params.id
        });

    } catch (error) {
        // Send error message to client
        res.status(500).json({ error: 'Failed to retrieve post' });
    }
};