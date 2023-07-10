// Render home page
module.exports = async (req, res) => {
    try {
        const posts = await Post.find();                                // Retrieve blog posts from database
        res.render('home', { title: 'BTB: Home', posts });              // Render home page with posts
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });    // Send error message to client
    }
};