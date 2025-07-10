import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  if (!video) return null;

  return (
    <Link to={`/video/${video._id}`} className="block bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={video.thumbnailUrl || 'https://via.placeholder.com/320x180.png'}
        alt={video.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold truncate">{video.title}</h3>
        <p className="text-xs text-gray-500">{video.uploader?.username || 'Unknown uploader'}</p>
        <p className="text-xs text-gray-500">
          {video.views} views • {new Date(video.uploadDate).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default VideoCard;
