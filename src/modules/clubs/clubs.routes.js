const express = require('express');
const clubs = require('./clubs.controllers');

const router = express.Router();

// CRUD

// Create Club
router.post('/', clubs.postClub);

// Read Clubs
router.get('/', clubs.getClubs);
router.get('/:id', clubs.getClub);

// Update Club
router.patch('/:id', clubs.patchClub);

// Delete Club
router.delete('/:id', clubs.deleteClub);

module.exports = router;
