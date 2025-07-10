const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  channelName: String,
  description: String,
  channelBanner: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subscribers: Number,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
});

module.exports = mongoose.model('Channel', channelSchema);
