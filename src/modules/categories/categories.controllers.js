const { Player_Categories } = require('../../models');

// Create Category
exports.postCategory = (req, res) => {
    Player_Categories.create(req.body)
        .then((category) =>
            res.status(201).json({
                message: 'Player category created successfully!',
                category,
            })
        )
        .catch((err) => {
            console.error('create category error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};

// Read all Categories
exports.getCategories = (req, res) => {
    Player_Categories.findAll()
        .then((rows) => res.json(rows))
        .catch((err) => {
            console.error('get categories error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};

// Read One
exports.getCategory = (req, res) => {
    const id = req.params.id;
    Player_Categories.findByPk(id)
        .then((cat) => {
            if (!cat)
                return res
                    .status(404)
                    .json({ message: `Category with id: ${id} not found.` });
            const message = {
                message: `Category with id: ${id} fetched successfully!`,
                cat,
            };
            res.json(message);
        })
        .catch((err) => {
            console.error('Get Category Error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};

// Patch Club
exports.patchCategory = (req, res) => {
    const id = req.params.id;
    Player_Categories.findByPk(id)
        .then((cat) => {
            if (!cat)
                return res
                    .status(404)
                    .json({ message: `Category ${id} not found.` });
            return cat.update(req.body).then((updated) => {
                const message = {
                    message: `Category with id: ${id} updated successfully!`,
                    category: updated,
                };
                res.json(message);
            });
        })
        .catch((err) => {
            console.error('Patch Category Error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};

// Delete Club
exports.deleteCategory = (req, res) => {
    const { id } = req.params;
    Player_Categories.destroy({ where: { category_id: id } })
        .then((count) => {
            if (!count)
                return res
                    .status(404)
                    .json({ message: `Category ${id} not found.` });
            const message = {
                message: `Category ${id} deleted successfully!`,
            };
            res.json(message);
        })
        .catch((err) => {
            console.error('Delete Category Error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};
