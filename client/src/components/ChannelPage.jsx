import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChannelPage = () => {
  const [channel, setChannel] = useState(null);

  const fetchChannel = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChannel(res.data);
    } catch (err) {
      console.error('Failed to fetch channel:', err);
      alert('Failed to load channel');
    }
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  const deleteVideo = async (videoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchChannel(); // Refresh channel data
    } catch (err) {
      console.error('Failed to delete video:', err);
      alert('Error deleting video');
    }
  };

  if (!channel) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{channel.channelName}</h2>
      <p className="text-sm text-gray-600">{channel.description}</p>
      <img
        src={channel.channelBanner}
        alt="Banner"
        className="w-full h-48 object-cover mt-2 rounded"
      />

      <h3 className="mt-6 text-lg font-semibold">Videos</h3>
      <ul className="space-y-2">
        {channel.videos?.map((video) => (
          <li
            key={video._id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>{video.title}</span>
            <button
              onClick={() => deleteVideo(video._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelPage;
