const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/commentContoller');

// POST /api/comments - Add a comment (requires auth)
router.post('/', auth, commentController.addComment);

// DELETE /api/comments/:id - Delete a comment (requires auth)
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;
