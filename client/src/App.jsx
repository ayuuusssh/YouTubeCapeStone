import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoPage from './pages/VideoPage';
import CreateChannel from './pages/CreateChannel';
import ChannelPage from './components/ChannelPage';

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [isSidebarMini, setIsSidebarMini] = useState(false);
  const location = useLocation();

  // Restore user from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarMini(false);
    }
  }, [location]);

  return (
    <>
      <Header
        user={user}
        setUser={setUser} 
        onToggleSidebar={() => setIsSidebarMini((prev) => !prev)}
      />
      <div className="flex">
        <Sidebar mini={isSidebarMini} />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/channel" element={<ChannelPage user={user} />} />
           <Route path="/create-channel" element={<CreateChannel user={user} />} />

          </Routes>
        </main>
      </div>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
