const express = require('express');
const mainController = require('../controllers/main');

const router = express.Router();

// GET /main/posts
router.get('/posts', mainController.getPosts);

// POST /main/post
router.post('/post', mainController.postCreatePost);

module.exports = router;
