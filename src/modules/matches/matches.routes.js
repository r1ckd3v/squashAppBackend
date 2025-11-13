const express = require('express');
const matches = require('./matches.controllers');

const router = express.Router();

// CRUD

// Create Match
router.post('/', matches.postMatch);

// Read Matches
router.get('/', matches.getMatches);
router.get('/:id', matches.getMatch);

// Update Match
router.patch('/:id', matches.patchMatch);

// Delete Match
router.delete('/:id', matches.deleteMatch);

module.exports = router;
