import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 py-3 px-4">
      {/* Left Sideg */}
      <div className="navbar-start relative">
        <button
          className="btn btn-ghost btn-circle hover:bg-primary/10 transition-all duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>

        {menuOpen && (
          <div 
            className="absolute left-0 top-full mt-4 w-80 max-h-[85vh] bg-base-100 shadow-xl rounded-xl overflow-hidden z-50 border border-base-300 animate-fadeIn"
            onMouseLeave={() => setMenuOpen(false)}
          >
            <div className="bg-base-100 border-b border-base-300 p-4">
              <h2 className="text-xl font-semibold text-base-content flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Navigation
              </h2>
            </div>

            <div className="p-4 bg-base-100 flex flex-col justify-between h-full">
              <ul className="menu menu-lg p-0">
                <li><Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-3 hover:bg-base-200 rounded-lg"><span>Home</span></Link></li>
                <li><Link to="/messages" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-3 hover:bg-base-200 rounded-lg"><span>Messages</span></Link></li>
                <li><Link to="/notifications" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-3 hover:bg-base-200 rounded-lg"><span>Notifications</span></Link></li>
                <li><Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-3 hover:bg-base-200 rounded-lg"><span>Profile</span></Link></li>
                <li><Link to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-3 hover:bg-base-200 rounded-lg"><span>Settings</span></Link></li>
              </ul>
              <div className="mt-6">
                <a
                  href="http://localhost:3030/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-outline w-full text-lime-border border-lime-border hover:text-lime-border hover:border-lime-border hover:bg-lime-border/10 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 stroke-lime-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Frenz logo */}
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-2xl">
          <span className="text-purple-500">F</span>renz
        </Link>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2 items-center justify-end space-x-1">
        {!showSearch ? (
          <button className="btn btn-ghost btn-circle" onClick={() => setShowSearch(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        ) : (
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-32 md:w-auto"
            autoFocus
            onBlur={() => setShowSearch(false)}
          />
        )}

        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar ring-2 ring-lime-border ring-offset-2 ring-offset-base-100"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border border-gray-700"
          >
            <li><Link to="/profile" className="justify-between">Profile <span className="badge">New</span></Link></li>
          
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
