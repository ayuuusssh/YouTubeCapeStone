const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnailUrl: String,
  videoUrl: String,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  views: Number,
  likes: Number,
  dislikes: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  uploadDate: Date
});

module.exports = mongoose.model('Video', videoSchema);
