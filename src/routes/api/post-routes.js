const router = require('express').Router();
const { User, Post, Comment } = require('../../models/models');

// CREATE new post
router.post('/', async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        });

        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// CREATE new comment
router.post('/:id', async (req, res) => {
    try {
        const dbCommentData = await Comment.create({
            content: req.body.content,
            user_id: req.session.userId,
            post_id: req.body.post_id,
        });

        res.status(200).json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// VIEW post
router.get('/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['content', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });

        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;