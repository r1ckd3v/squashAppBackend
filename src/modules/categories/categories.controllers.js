const { Player_Categories } = require('../../models');

// Create Category
exports.createCategory = (req, res) => {
  Player_Categories.create(req.body)
    .then((category) =>
      res.status(201).json({
        message: '✅ Player category created successfully!',
        category,
      })
    )
    .catch((err) => {
      console.error('create category error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};

// Get all Categories
exports.getCategories = (req, res) => {
  Player_Categories.findAll()
    .then((rows) => res.json(rows))
    .catch((err) => {
      console.error('get categories error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};
