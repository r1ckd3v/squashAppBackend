const express = require('express');
const games = require('./games.controllers');

const router = express.Router();

// CRUD

// Create Game
router.post('/', games.postGame);

// Read Games
router.get('/', games.getGames);
router.get('/:id', games.getGame);

// Update Game
router.patch('/:id', games.patchGame);

// Player 1 Scores
router.patch('/:id/player1-scores', games.player1Scores);

// Player 2 Scores
router.patch('/:id/player2-scores', games.player2Scores);

// Delete Game
router.delete('/:id', games.deleteGame);

module.exports = router;
