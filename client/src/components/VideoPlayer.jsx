import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`/api/videos/${id}`);
      setVideo(res.data);
      setComments(res.data.comments || []);
    };
    fetchVideo();
  }, [id]);

  const handleAddComment = async () => {
    const res = await axios.post(`/api/comments/${id}`, { text });
    setComments([...comments, res.data]);
    setText('');
  };

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`/api/comments/${commentId}`);
    setComments(comments.filter((c) => c._id !== commentId));
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <video controls className="w-full rounded">
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h2 className="text-xl font-bold mt-4">{video.title}</h2>
      <p>{video.description}</p>
      <p className="text-sm text-gray-500">Channel: {video.channelName}</p>

      <div className="flex gap-4 mt-2">
        <button>👍 {video.likes}</button>
        <button>👎 {video.dislikes}</button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Comments</h3>
        <div className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment"
            className="border px-2 py-1 flex-1 rounded"
          />
          <button onClick={handleAddComment} className="bg-blue-600 text-white px-4 rounded">
            Post
          </button>
        </div>
        <ul>
          {comments.map((c) => (
            <li key={c._id} className="border-b py-2 flex justify-between">
              <span>{c.text}</span>
              <button
                className="text-red-600 text-sm"
                onClick={() => handleDeleteComment(c._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoPlayer;
