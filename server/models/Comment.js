const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  timestamp: { type: Date, default: Date.now },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' }
});

module.exports = mongoose.model('Comment', commentSchema);
