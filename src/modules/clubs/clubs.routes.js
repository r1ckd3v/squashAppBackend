const router = require('express').Router();
const clubs = require('./clubs.controllers');

router.post('/create', clubs.createClub);
router.get('/all', clubs.getClubs);

module.exports = router;
