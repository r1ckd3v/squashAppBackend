const { Clubs } = require('../../models');

// Create Club
exports.createClub = (req, res) => {
  Clubs.create(req.body)
    .then((club) =>
      res.status(201).json({
        message: '✅ Club created successfully!',
        club,
      })
    )
    .catch((err) => {
      console.error('create club error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};

// Get all Clubs
exports.getClubs = (req, res) => {
  Clubs.findAll()
    .then((rows) => res.json(rows))
    .catch((err) => {
      console.error('get clubs error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};
