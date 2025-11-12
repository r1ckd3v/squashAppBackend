const router = require('express').Router();
const cats = require('./categories.controllers');

router.post('/', cats.createCategory);
router.get('/', cats.getCategories);

module.exports = router;
