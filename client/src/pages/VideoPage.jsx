import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';
import CommentsSection from '../components/CommentSection';

const VideoPage = () => {
  const { id } = useParams(); // videoId from URL
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch video by ID
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // Add comment
 const addComment = async (text) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      `/api/comments`,
      { text, videoId: video._id },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // Update the comments in the UI immediately
    setVideo((prevVideo) => ({
      ...prevVideo,
      comments: [...prevVideo.comments, res.data],
    }));
  } catch (err) {
    console.error('Error adding comment:', err);
    alert('You must be logged in to comment.');
  }
};


  // Delete comment
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId),
      }));
    } catch (err) {
      alert('Failed to delete comment');
    }
  };

  if (loading) return <div className="p-4">Loading video...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!video) return null;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <VideoPlayer videoUrl={video.videoUrl} />
      <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
      <p className="text-sm text-gray-500 mt-1">
        Uploaded by: {video.channel?.channelName || 'Unknown Channel'}
      </p>
      <p className="mt-2 text-gray-700">{video.description}</p>

      <CommentsSection
        comments={video.comments || []}
        onAddComment={addComment}
        onDeleteComment={deleteComment}
      />
    </div>
  );
};

export default VideoPage;
