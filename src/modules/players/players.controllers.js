const { Players, Clubs, Player_Categories } = require('../../models');

// CREATE
exports.postCreatePlayer = (req, res) => {
  Players.create(req.body)
    .then((player) =>
      res.status(201).json({
        message: '✅ Player created successfully!',
        player,
      })
    )
    .catch((err) => {
      console.error('create player error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};

// READ ALL (include Club + Category)
exports.getPlayers = (req, res) => {
  Players.findAll({
    include: [
      { model: Clubs, as: 'club' },
      { model: Player_Categories, as: 'category' },
    ],
  })
    .then((rows) =>
      res.json({
        message: '✅ Players fetched successfully!',
        total: rows.length,
        players: rows,
      })
    )
    .catch((err) => {
      console.error('get players error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};

// READ ONE (include Club + Category)
exports.getPlayer = (req, res) => {
  const id = req.params.id;
  Players.findByPk(id, {
    include: [
      { model: Clubs, as: 'club' },
      { model: Player_Categories, as: 'category' },
    ],
  })
    .then((player) => {
      if (!player)
        return res
          .status(404)
          .json({ message: `Player with id: ${id} not found.` });
      res.json({
        message: '✅ Player fetched successfully!',
        player,
      });
    })
    .catch((err) => {
      console.error('get player error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};

// UPDATE (PATCH)
exports.patchPlayer = (req, res) => {
  const id = req.params.id;
  Players.findByPk(id)
    .then((player) => {
      if (!player)
        return res.status(404).json({ message: `Player ${id} not found.` });
      return player.update(req.body).then((updated) =>
        res.json({
          message: '✅ Player updated successfully!',
          player: updated,
        })
      );
    })
    .catch((err) => {
      console.error('patch player error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};

// exports.putPlayer = (req, res, next) => {
//   const id = req.params.id;
//   // put in the DB
//   res.status(200).json({
//     message: `Player ${id} has been PUT`,
//     player: [{ id: id, name: 'Paul', lastName: 'Coll' }],
//   });
// };

// DELETE
exports.deletePlayer = (req, res) => {
  const { id } = req.params;
  Players.destroy({ where: { player_id: id } })
    .then((count) => {
      if (!count)
        return res.status(404).json({ message: `Player ${id} not found.` });
      res.json({ message: `✅ Player ${id} deleted successfully!` });
    })
    .catch((err) => {
      console.error('delete player error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};
