// routes/channelRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const channelController = require('../controllers/channelController');

// POST /api/channels - create a new channel
router.post('/', auth, channelController.createChannel);

// GET /api/channels - get current user's channel
router.get('/', auth, channelController.getUserChannel);

module.exports = router;
