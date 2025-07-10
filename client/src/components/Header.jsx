import React from 'react';
import { Menu, Search, Mic } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, setUser, onToggleSidebar }) => {
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleCreateChannel = () => {
    if (!user) {
      alert('Login or register required to create a channel');
      return;
    }
    navigate('/create-channel');
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b shadow-sm bg-white sticky top-0 z-50">
      {/* Left - Hamburger + Logo */}
      <div className="flex items-center gap-4 w-1/4">
        <button onClick={onToggleSidebar} className="p-1">
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://www.vectorlogo.zone/logos/youtube/youtube-ar21.svg"
            alt="YouTube"
            className="h-12 w-auto"
          />
        </Link>
      </div>

      {/* Center - Search */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center w-2/4 max-w-xl border border-gray-300 rounded-full overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search"
          className="flex-1 px-4 py-1 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-gray-100 px-4 border-l border-gray-200">
          <Search size={20} />
        </button>
      </form>

      <button className="ml-4 hidden md:inline-block p-2 rounded-full bg-gray-100 hover:bg-gray-200">
        <Mic size={18} />
      </button>

      {/* Right - User or Sign In */}
      <div className="w-1/4 flex justify-end items-center gap-4">
        {user && (
          <button
            onClick={handleCreateChannel}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
          >
            Create Channel
          </button>
        )}

        {user ? (
          <>
            <span className="text-sm text-gray-700">Hello, {user.username || user.name}</span>
            <button
              onClick={handleLogout}
              className="border px-3 py-1 rounded text-red-600 border-red-600 hover:bg-red-50 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="border px-3 py-1 rounded text-blue-600 border-blue-600 hover:bg-blue-50 text-sm"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border px-3 py-1 rounded text-green-600 border-green-600 hover:bg-green-50 text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;










