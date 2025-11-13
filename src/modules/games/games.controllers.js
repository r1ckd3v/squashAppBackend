const { Games, Matches } = require('../../models');

//CRUD

// Create a new game
exports.postGame = (req, res) => {
    const { match_id, game_number, player1_points, player2_points } = req.body;

    if (
        match_id === undefined ||
        game_number === undefined ||
        player1_points === undefined ||
        player2_points === undefined
    ) {
        return res.status(400).json({
            message:
                'Missing required fields: match_id, game_number, player1_points, player2_points.',
        });
    }

    Games.create({
        match_id,
        game_number,
        player1_points,
        player2_points,
    })
        .then((game) => {
            res.status(201).json({
                message: 'Game created successfully.',
                data: game,
            });
        })
        .catch((error) => {
            console.error('Error creating game:', error);
            res.status(500).json({
                message: 'Failed to create game.',
            });
        });
};

// Get all games (optional filters: match_id, game_number)
exports.getGames = (req, res) => {
    const { match_id, game_number } = req.query;
    const where = {};

    if (match_id) where.match_id = match_id;
    if (game_number) where.game_number = game_number;

    Games.findAll({
        where,
        include: [{ model: Matches, as: 'match' }],
        order: [['game_number', 'ASC']],
    })
        .then((games) => {
            res.status(200).json({
                message: 'Games retrieved successfully.',
                count: games.length,
                data: games,
            });
        })
        .catch((error) => {
            console.error('Error fetching games:', error);
            res.status(500).json({
                message: 'Failed to fetch games.',
            });
        });
};

// Get a single game by ID
exports.getGame = (req, res) => {
    const { id } = req.params;

    Games.findByPk(id, {
        include: [{ model: Matches, as: 'match' }],
    })
        .then((game) => {
            if (!game) {
                return res.status(404).json({ message: 'Game not found.' });
            }
            res.status(200).json({
                message: 'Game retrieved successfully.',
                data: game,
            });
        })
        .catch((error) => {
            console.error('Error fetching game:', error);
            res.status(500).json({
                message: 'Failed to fetch game.',
            });
        });
};

// Update a game
exports.patchGame = (req, res) => {
    const { id } = req.params;

    Games.findByPk(id)
        .then((game) => {
            if (!game) {
                return res.status(404).json({ message: 'Game not found.' });
            }

            return game.update(req.body).then((updated) => {
                res.status(200).json({
                    message: 'Game updated successfully.',
                    data: updated,
                });
            });
        })
        .catch((error) => {
            console.error('Error updating game:', error);
            res.status(500).json({
                message: 'Failed to update game.',
            });
        });
};

// Increment player1_points
exports.player1Scores = (req, res) => {
    const { id } = req.params;

    Games.findByPk(id)
        .then((game) => {
            if (!game) {
                return res.status(404).json({
                    message: 'Game not found.',
                });
            }

            return game
                .update({ player1_points: game.player1_points + 1 })
                .then((updated) => {
                    res.status(200).json({
                        message: 'Player 1 points incremented successfully.',
                        data: updated,
                    });
                    req.app.get('io').emit('player:score', {
                        message: 'Player 1 Scored',
                        data: updated,
                    }); // emmit SocketIO event when player 1 Scores
                });
        })
        .catch((error) => {
            console.error('Error incrementing player1 points:', error);
            res.status(500).json({
                message: 'Failed to increment player1 points.',
            });
        });
};

// Increment player2_points
exports.player2Scores = (req, res) => {
    const { id } = req.params;

    Games.findByPk(id)
        .then((game) => {
            if (!game) {
                return res.status(404).json({
                    message: 'Game not found.',
                });
            }

            return game
                .update({ player2_points: game.player2_points + 1 })
                .then((updated) => {
                    res.status(200).json({
                        message: 'Player 2 points incremented successfully.',
                        data: updated,
                    });
                    req.app.get('io').emit('player:score', {
                        message: 'Player 2 Scored',
                        data: updated,
                    }); // emmit SocketIO event when player 2 Scores
                });
        })
        .catch((error) => {
            console.error('Error incrementing player2 points:', error);
            res.status(500).json({
                message: 'Failed to increment player2 points.',
            });
        });
};

// Delete a game
exports.deleteGame = (req, res) => {
    const { id } = req.params;

    Games.findByPk(id)
        .then((game) => {
            if (!game) {
                return res.status(404).json({ message: 'Game not found.' });
            }

            return game.destroy().then(() => {
                res.status(200).json({
                    message: 'Game deleted successfully.',
                });
            });
        })
        .catch((error) => {
            console.error('Error deleting game:', error);
            res.status(500).json({
                message: 'Failed to delete game.',
            });
        });
};
