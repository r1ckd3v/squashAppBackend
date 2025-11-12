const { Players, Clubs, Player_Categories } = require('../../models');

// CREATE
exports.postPlayer = (req, res) => {
    Players.create(req.body)
        .then((player) => {
            const message = {
                message: '✅ Player created successfully!',
                player,
            };
            res.status(201).json(message);
            req.app.get('io').emit('player:created', message); // emmit SocketIO event when player is created
        })
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
        .then((rows) => {
            const message = {
                message: '✅ Players fetched successfully!',
                total: rows.length,
                players: rows,
            };
            res.json(message);
            req.app.get('io').emit('player:fetchAll', message); // emmit SocketIO event when all players are fetched
        })
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
            const message = {
                message: `✅ Player with id: ${id} fetched successfully!`,
                player,
            };
            res.json(message);
            req.app.get('io').emit('player:fetch', message);
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
                return res
                    .status(404)
                    .json({ message: `Player ${id} not found.` });
            return player.update(req.body).then((updated) => {
                const message = {
                    message: `✅ Player with id: ${id} updated successfully!`,
                    player: updated,
                };
                res.json(message);
                req.app.get('io').emit('player:update', message);
            });
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
                return res
                    .status(404)
                    .json({ message: `Player ${id} not found.` });
            const message = {
                message: `✅ Player ${id} deleted successfully!`,
            };
            res.json(message);
            req.app.get('io').emit('player:delete', message);
        })
        .catch((err) => {
            console.error('delete player error:', err);
            res.status(500).json({ message: 'internal error' });
        });
};
