const Video = require('../models/Video');

exports.getAll = async (search = '') => {
  const filter = search
    ? { title: { $regex: search, $options: 'i' } }
    : {};
  return await Video.find(filter).populate('uploader', 'username');
};

exports.getById = async (id) => {
  return await Video.findById(id)
    .populate({
      path: 'comments',
      populate: {
        path: 'userId',
        select: 'username avatar', // ✅ fetch only required fields
      },
    })
    .populate('uploader', 'username'); // (Optional) for showing uploader info
};

exports.upload = async (videoData, userId) => {
  const video = new Video({ ...videoData, uploader: userId });
  return await video.save();
};

exports.remove = async (id) => {
  return await Video.findByIdAndDelete(id);
};
