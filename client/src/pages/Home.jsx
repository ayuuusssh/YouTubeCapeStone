import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoGrid from '../components/VideoGrid';

const Home = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('search') || '';
  const [videos, setVideos] = useState([]);
  const [hasChannel, setHasChannel] = useState(false);

  // ✅ Fetch videos on query change
  useEffect(() => {
    axios.get(`/api/videos?search=${query}`)
      .then(res => {
        console.log('💡 Videos fetched:', res.data);
        setVideos(res.data);
      })
      .catch(err => {
        console.error('Error fetching videos:', err);
        setVideos([]);
      });
  }, [query]);

  // ✅ Check if user has a channel
  useEffect(() => {
    const fetchUserChannel = async () => {
      if (user) {
        try {
          const res = await axios.get('/api/channels');
          if (res.data && res.data._id) {
            setHasChannel(true);
          } else {
            setHasChannel(false);
          }
        } catch (err) {
          setHasChannel(false); // No channel or error
        }
      }
    };
    fetchUserChannel();
  }, [user]);

  const handleCreateChannelClick = () => {
    if (!user) {
      alert('You must login or register to create a channel.');
    } else {
      navigate('/create-channel');
    }
  };

  return (
  <div className="p-4">
    {/* ✅ Block for logged-out users */}
    {!user ? (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="p-6 bg-white rounded shadow-md text-center w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Try searching to get started</h2>
          <p className="text-gray-500">
            Start watching videos to help us build a feed of videos you'll love.
          </p>
        </div>
      </div>
    ) : (
      <>
        {/* ✅ Create Channel Button if user has no channel */}
        {!hasChannel && (
          <button
            onClick={handleCreateChannelClick}
            className="bg-red-600 text-white px-4 py-2 rounded mb-4"
          >
            Create Channel
          </button>
        )}

        {/* ✅ Search query info */}
        {query && (
          <p className="mb-4 text-gray-600">
            Showing results for "<b>{query}</b>"
          </p>
        )}

        {/* ✅ Video Grid */}
        <VideoGrid videos={videos} />
      </>
    )}
  </div>
);

};

export default Home;







// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import VideoGrid from '../components/VideoGrid';

// const Home = ({ user }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const query = new URLSearchParams(location.search).get('search') || '';
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     axios.get(`/api/videos?search=${query}`)
//       .then(res => {
//         console.log('💡 Videos fetched:', res.data);
//         setVideos(res.data);
//       })
//       .catch(err => {
//         console.error('Error fetching videos:', err);
//         setVideos([]);
//       });
//   }, [query]);

//   const handleCreateChannelClick = () => {
//     if (!user) {
//       alert('You must login or register to create a channel.');
//     } else {
//       navigate('/create-channel');
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* ✅ Show Create Channel Button */}
//       {!user?.channel && (
//         <button
//           onClick={handleCreateChannelClick}
//           className="bg-red-600 text-white px-4 py-2 rounded mt-4 inline-block"
//         >
//           Create Channel
//         </button>
//       )}

//       {/* ✅ If user is not logged in and no videos */}
//       {!user && videos.length === 0 && !query ? (
//         <div className="flex items-center justify-center h-[70vh]">
//           <div className="p-6 bg-white rounded shadow-md text-center w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-2">Try searching to get started</h2>
//             <p className="text-gray-500">
//               Start watching videos to help us build a feed of videos you'll love.
//             </p>
//           </div>
//         </div>
//       ) : (
//         <>
//           {query && (
//             <p className="mb-4 text-gray-600">
//               Showing results for "<b>{query}</b>"
//             </p>
//           )}
//           <VideoGrid videos={videos} />
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;


