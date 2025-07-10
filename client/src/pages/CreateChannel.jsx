import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateChannel = () => {
  const [formData, setFormData] = useState({
    channelName: '',
    handle: '',
    description: '',
    channelBanner: '',
  });

  const [loading, setLoading] = useState(true);
  const [hasChannel, setHasChannel] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('⛔ No token found in localStorage');
      setLoading(false);
      return;
    }

    // Set token in Axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const checkExistingChannel = async () => {
      try {
        const res = await axios.get('/api/channels');
        if (res.data && res.data._id) {
          console.log('✅ Existing channel found:', res.data);
          setHasChannel(true);
          navigate('/channel');
        } else {
          setHasChannel(false);
        }
      } catch (err) {
        console.warn('No channel found:', err.response?.data || err.message);
        setHasChannel(false); 
      } finally {
        setLoading(false);
      }
    };

    checkExistingChannel();
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('📤 Sending form data:', formData);
      await axios.post('/api/channels', formData);
      navigate('/channel');
    } catch (err) {
      console.error('Create channel error:', err.response?.data || err.message);
      alert(`Failed to create channel: ${err.response?.data?.error || err.message}`);
    }
  };

  if (loading) return <p className="text-center mt-10">⏳ Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Create Your Channel</h2>

      <input
        name="channelName"
        onChange={handleChange}
        placeholder="Channel Name"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="handle"
        onChange={handleChange}
        placeholder="Handle (e.g., @coolcreator)"
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        name="description"
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full rounded"
        rows="3"
      />
      <input
        name="channelBanner"
        onChange={handleChange}
        placeholder="Banner URL (optional)"
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Channel
      </button>
    </form>
  );
};

export default CreateChannel;
