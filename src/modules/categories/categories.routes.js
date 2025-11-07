const router = require('express').Router();
const cats = require('./categories.controllers');

router.post('/create', cats.createCategory);
router.get('/all', cats.getCategories);

module.exports = router;
