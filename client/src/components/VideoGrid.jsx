import React from 'react';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos }) => {
  if (!Array.isArray(videos) || videos.length === 0) {
    return <p className="text-center text-gray-500">No videos to show.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map(video => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;



