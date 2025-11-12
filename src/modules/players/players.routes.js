const express = require('express');
const playersController = require('./players.controllers');

const router = express.Router();

// CRUD

// Create Player
router.post('/', playersController.postPlayer);

// Read Players

router.get('/', playersController.getPlayers);
router.get('/:id', playersController.getPlayer);

// Update Player

router.patch('/:id', playersController.patchPlayer);
// router.put('/:id', playersController.putPlayer);

// Delete Player

router.delete('/:id', playersController.deletePlayer);

module.exports = router;
