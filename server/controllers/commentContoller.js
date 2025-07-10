const commentService = require('../services/commentService');

exports.addComment = async (req, res) => {
  try {
    const { videoId } = req.params; // Get video ID from route
    const userId = req.user.id;     // Auth middleware adds this
    const { text } = req.body;

    const comment = await commentService.add({ text, videoId, userId });
    res.status(201).json(comment);
  } catch (err) {
    console.error('Error adding comment:', err.message);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await commentService.remove(req.params.id);
    res.json({ msg: 'Comment deleted' });
  } catch (err) {
    console.error('Error deleting comment:', err.message);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
