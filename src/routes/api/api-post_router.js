const router = require('express').Router();
const { newPost, newComment, getPost, deletePost } = require('../../controllers/api/post_ctrl');

router
    .post('/', async (req, res) => {newPost(req, res);})            // Create new blog post
    .post('/:id', async (req, res) => {newComment(req, res);})      // Create new comment
    .get('/:id', async (req, res) => {getPost(req, res);})          // Get blog post
    .delete('/:id', async (req, res) => {deletePost(req, res);});   // Delete blog post

module.exports = router;