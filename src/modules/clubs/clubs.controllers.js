const { Clubs } = require('../../models');

// Create Club
exports.postClub = (req, res) => {
    Clubs.create(req.body)
        .then((club) =>
            res.status(201).json({
                message: 'Club created successfully!',
                club,
            })
        )
        .catch((err) => {
            console.error('create club error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};

// Read all Clubs
exports.getClubs = (req, res) => {
    Clubs.findAll()
        .then((rows) => res.json(rows))
        .catch((err) => {
            console.error('get clubs error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};

// Read One
exports.getClub = (req, res) => {
    const id = req.params.id;
    Clubs.findByPk(id)
        .then((club) => {
            if (!club)
                return res
                    .status(404)
                    .json({ message: `Club with id: ${id} not found.` });
            const message = {
                message: `Club with id: ${id} fetched successfully!`,
                club,
            };
            res.json(message);
        })
        .catch((err) => {
            console.error('Get Club Error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};

// Patch Club
exports.patchClub = (req, res) => {
    const id = req.params.id;
    Clubs.findByPk(id)
        .then((club) => {
            if (!club)
                return res
                    .status(404)
                    .json({ message: `Club ${id} not found.` });
            return club.update(req.body).then((updated) => {
                const message = {
                    message: `Club with id: ${id} updated successfully!`,
                    club: updated,
                };
                res.json(message);
            });
        })
        .catch((err) => {
            console.error('Patch Club Error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};

// Delete Club
exports.deleteClub = (req, res) => {
    const { id } = req.params;
    Clubs.destroy({ where: { club_id: id } })
        .then((count) => {
            if (!count)
                return res
                    .status(404)
                    .json({ message: `Club ${id} not found.` });
            const message = {
                message: `Club ${id} deleted successfully!`,
            };
            res.json(message);
        })
        .catch((err) => {
            console.error('Delete Club Error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};
