const Channel = require('../models/Channel');

exports.getByUser = async (userId) => {
  return await Channel.findOne({ owner: userId }).populate('videos');
};

exports.create = async (data, userId) => {
  const existing = await Channel.findOne({ owner: userId });
  if (existing) {
    throw new Error('Channel already exists');
  }
  const channel = new Channel({ ...data, owner: userId });
  return await channel.save();
};