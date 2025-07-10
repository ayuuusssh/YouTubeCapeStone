const Channel = require('../models/Channel');
const channelService = require('../services/channelService');

// Create a channel
exports.createChannel = async (req, res) => {
  try {
    const userId = req.user.userId;

    const existing = await Channel.findOne({ owner: userId });
    if (existing) {
      return res.status(400).json({ error: 'Channel already exists' });
    }

    const channel = await channelService.create(req.body, userId);
    res.status(201).json(channel);
  } catch (err) {
    console.error('Failed to create channel:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user's channel
exports.getUserChannel = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ Fix here
    const channel = await channelService.getByUser(userId);
    res.json(channel);
  } catch (err) {
    console.error('Get channel error:', err.message);
    res.status(404).json({ error: 'Channel not found' });
  }
};







// const channelService = require('../services/channelService');

// // controller
// exports.createChannel = async (req, res) => {
//   try {
//     const existing = await Channel.findOne({ owner: req.user.userId });
//     if (existing) {
//       return res.status(400).json({ error: 'Channel already exists' });
//     }

//     const channel = await channelService.create(req.body, req.user.userId);
//     res.status(201).json(channel);
//   } catch (err) {
//     console.error('Failed to create channel:', err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// exports.getUserChannel = async (req, res) => {
//   try {
//     const channel = await channelService.getByUser(req.user.id);
//     res.json(channel);
//   } catch (err) {
//     res.status(404).json({ error: 'Channel not found' });
//   }
// };
// exports.createChannel = async (req, res) => {
//   console.log('Authenticated User ID:', req.user.userId); // must be present

//   try {
//     const channel = await channelService.create(req.body, req.user.id);
//     res.status(201).json(channel);
//   } catch (err) {
//     if (err.message === 'Channel already exists') {
//       return res.status(400).json({ error: err.message });
//     }
//     res.status(500).json({ error: 'Failed to create channel' });
//   }
// };
