const express = require('express');
const healthController = require('./healthCheck.controllers');

const router = express.Router();

router.get('/health', healthController.getHealthCheck);

module.exports = router;
