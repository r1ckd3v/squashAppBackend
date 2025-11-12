const router = require('express').Router();
const cats = require('./categories.controllers');

// CRUD

// Create Category
router.post('/', cats.postCategory);

// Read Categories
router.get('/', cats.getCategories);
router.get('/:id', cats.getCategory);

// Update Category
router.patch('/:id', cats.patchCategory);

// Delete Club
router.delete('/:id', cats.deleteCategory);

module.exports = router;
