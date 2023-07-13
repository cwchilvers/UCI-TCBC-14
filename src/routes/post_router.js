const router = require('express').Router();

// View Controllers
const viewCtrl = {
    post: require('../controllers/views/post_ctrl'),
    newPost: require('../controllers/views/newPost_ctrl'),
    editPost: require('../controllers/views/editPost_ctrl'),
}

router 
    .get('/new', viewCtrl.newPost)
    .get('/:id', viewCtrl.post)
    .get('/:id/edit/', viewCtrl.editPost);

module.exports = router;