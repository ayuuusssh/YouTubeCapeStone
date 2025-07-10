const Comment = require('../models/Comment');
const Video = require('../models/Video');

exports.add = async ({ text, videoId }, userId) => {
  // 1. Create and save the comment
  const comment = new Comment({
    text,
    videoId,
    userId,
    timestamp: new Date(),
  });
  await comment.save();

  // 2. Push comment ID to video’s comments array
  await Video.findByIdAndUpdate(
    videoId,
    { $push: { comments: comment._id } },
    { new: true }
  );

  // 3. Return the saved comment with user populated
  return await Comment.findById(comment._id).populate('userId', 'username avatar');
};

exports.remove = async (id) => {
  // 1. Find the comment
  const comment = await Comment.findById(id);
  if (!comment) throw new Error('Comment not found');

  // 2. Remove it from the video.comments array
  await Video.findByIdAndUpdate(comment.videoId, {
    $pull: { comments: comment._id },
  });

  // 3. Delete the comment itself
  return await Comment.findByIdAndDelete(id);
};
