
const videoService = require('../services/videoService');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await videoService.getAll(req.query.search);
    res.json(videos);
  } catch (err) {
    console.error('Video fetch error:', err.message);
    res.status(500).json({ error: 'Could not fetch videos', details: err.message });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await videoService.getById(req.params.id);
    res.json(video);
  } catch (err) {
    res.status(404).json({ error: 'Video not found' });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    const video = await videoService.upload(req.body, req.user.id);
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    await videoService.remove(req.params.id);
    res.json({ msg: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
