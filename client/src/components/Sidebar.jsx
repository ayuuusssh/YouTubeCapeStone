import React from 'react';
import { Home, Clock, User, Flame, ShoppingBag, Music, Film, Tv, Gamepad } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ mini , user }) => {
  const navItem = 'flex items-center gap-4 p-2 rounded hover:bg-gray-100 text-sm';
  const iconOnly = 'justify-center';
  const labelHidden = mini ? 'hidden' : 'inline';

  return (
    <aside
      className={`h-screen bg-white border-r transition-all duration-300 ease-in-out
      ${mini ? 'w-20' : 'w-60'} overflow-y-auto sticky top-0 z-40`}
    >
      <div className="p-2">
        <Link to="/" className={`${navItem} ${mini ? iconOnly : ''}`}>
          <Home size={20} />
          <span className={labelHidden}>Home</span>
        </Link>
        <div className={`${navItem} ${mini ? iconOnly : ''}`}>
          <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/calendar-294-176565.png?f=webp&w=512" alt="Shorts" className="w-5" />
          <span className={labelHidden}>Shorts</span>
        </div>
        <div className={`${navItem} ${mini ? iconOnly : ''}`}>
          <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/subscription-5245031-4401174.png?f=webp&w=512" alt="Subscriptions" className="w-5" />
          <span className={labelHidden}>Subscriptions</span>
        </div>
      </div>

      <hr className="my-2" />

      <div className="p-2">
        <div className={`${navItem} ${mini ? iconOnly : ''}`}>
          <User size={20} />
          <span className={labelHidden}>You</span>
        </div>
        <div className={`${navItem} ${mini ? iconOnly : ''}`}>
          <Clock size={20} />
          <span className={labelHidden}>History</span>
        </div>
      </div>

      {!mini && (
        <>
          <hr className="my-2" />
          <div className="text-sm text-gray-600 px-2">
            Sign in to like videos, comment, and subscribe.
          </div>
          <Link to="/login">
            <button className="mt-3 px-4 py-1 border text-blue-600 border-blue-600 rounded hover:bg-blue-50 ml-2">
              Sign In
            </button>
          </Link>
        </>
      )}

      <hr className="my-4" />

      <div className="p-2">
        <div className={`text-xs font-semibold text-gray-500 mb-2 ${mini ? 'text-center' : ''}`}>
          {mini ? 'EXP' : 'Explore'}
        </div>
        <div className={`${navItem} ${mini ? iconOnly : ''}`}><Flame size={20} /><span className={labelHidden}>Trending</span></div>
        <div className={`${navItem} ${mini ? iconOnly : ''}`}><ShoppingBag size={20} /><span className={labelHidden}>Shopping</span></div>
        <div className={`${navItem} ${mini ? iconOnly : ''}`}><Music size={20} /><span className={labelHidden}>Music</span></div>
        <div className={`${navItem} ${mini ? iconOnly : ''}`}><Film size={20} /><span className={labelHidden}>Movies</span></div>
        <div className={`${navItem} ${mini ? iconOnly : ''}`}><Tv size={20} /><span className={labelHidden}>Live</span></div>
        <div className={`${navItem} ${mini ? iconOnly : ''}`}><Gamepad size={20} /><span className={labelHidden}>Gaming</span></div>
      </div>
      {user && (
  <div className="p-2">
    {user.channel ? (
      <Link to="/channel" className={`${navItem} ${mini ? iconOnly : ''}`}>
        <User size={20} />
        <span className={labelHidden}>My Channel</span>
      </Link>
    ) : (
      <Link to="/create-channel" className={`${navItem} ${mini ? iconOnly : ''}`}>
        <User size={20} />
        <span className={labelHidden}>Create Channel</span>
      </Link>
    )}
  </div>
)}

    </aside>
  );
};

export default Sidebar;
