const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllVideos,
  getVideoById,
  uploadVideo,
  deleteVideo
} = require('../controllers/videoController');

router.get('/', getAllVideos);
router.get('/:id', getVideoById);
router.post('/', auth, uploadVideo);
router.delete('/:id', auth, deleteVideo);

module.exports = router;
