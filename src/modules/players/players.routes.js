const express = require('express');
const playersController = require('./players.controllers');

const router = express.Router();

// CRUD

// Create Player
router.post('/create', playersController.postCreatePlayer);

// Read Players

router.get('/all', playersController.getPlayers);
router.get('/:id', playersController.getPlayer);

// Update Player

router.patch('/:id', playersController.patchPlayer);
// router.put('/:id', playersController.putPlayer);

// Delete Player

router.delete('/:id', playersController.deletePlayer);

module.exports = router;
