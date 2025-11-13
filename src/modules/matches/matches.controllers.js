const { Matches, Tournaments, Players, Games } = require('../../models');

//CRUD

// Create a new match
exports.postMatch = (req, res) => {
    const {
        tournament_id,
        player1_id,
        player2_id,
        winner_id,
        match_date,
        result,
        round,
    } = req.body;

    if (!tournament_id || !player1_id || !player2_id || !match_date) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing required fields.' });
    }

    Matches.create({
        tournament_id,
        player1_id,
        player2_id,
        winner_id,
        match_date,
        result,
        round,
    })
        .then((match) => {
            res.status(201).json({
                message: 'Match created successfully.',
                data: match,
            });
        })
        .catch((error) => {
            console.error('Error creating match:', error);
            res.status(500).json({
                message: 'Failed to create match.',
            });
        });
};

// Get all matches
exports.getMatches = (req, res) => {
    const { tournament_id, round } = req.query;
    const where = {};

    if (tournament_id) where.tournament_id = tournament_id;
    if (round) where.round = round;

    Matches.findAll({
        where,
        include: [
            { model: Tournaments, as: 'tournament' },
            { model: Players, as: 'player1' },
            { model: Players, as: 'player2' },
            { model: Players, as: 'winner' },
            { model: Games, as: 'Games' },
        ],
    })
        .then((matches) => {
            res.status(200).json({
                message: 'Matches retrieved successfully.',
                count: matches.length,
                data: matches,
            });
        })
        .catch((error) => {
            console.error('Error fetching matches:', error);
            res.status(500).json({
                message: 'Failed to fetch matches.',
            });
        });
};

// Get a single match by ID
exports.getMatch = (req, res) => {
    const { id } = req.params;

    Matches.findByPk(id, {
        include: [
            { model: Tournaments, as: 'tournament' },
            { model: Players, as: 'player1' },
            { model: Players, as: 'player2' },
            { model: Players, as: 'winner' },
            { model: Games, as: 'Games' },
        ],
    })
        .then((match) => {
            if (!match) {
                return res.status(404).json({ message: 'Match not found.' });
            }

            res.status(200).json({
                message: 'Match retrieved successfully.',
                data: match,
            });
        })
        .catch((error) => {
            console.error('Error fetching match:', error);
            res.status(500).json({
                message: 'Failed to fetch match.',
            });
        });
};

// Update a match
exports.patchMatch = (req, res) => {
    const { id } = req.params;

    Matches.findByPk(id)
        .then((match) => {
            if (!match) {
                return res.status(404).json({ message: 'Match not found.' });
            }

            return match.update(req.body).then((updated) => {
                res.status(200).json({
                    message: 'Match updated successfully.',
                    data: updated,
                });
            });
        })
        .catch((error) => {
            console.error('Error updating match:', error);
            res.status(500).json({
                message: 'Failed to update match.',
            });
        });
};

// Delete a match
exports.deleteMatch = (req, res) => {
    const { id } = req.params;

    Matches.findByPk(id)
        .then((match) => {
            if (!match) {
                return res.status(404).json({ message: 'Match not found.' });
            }

            return match.destroy().then(() => {
                res.status(200).json({
                    message: 'Match deleted successfully.',
                });
            });
        })
        .catch((error) => {
            console.error('Error deleting match:', error);
            res.status(500).json({
                message: 'Failed to delete match.',
            });
        });
};
