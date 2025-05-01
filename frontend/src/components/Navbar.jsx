import React from 'react';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {

  

  return (
    <div className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-4 py-2 backdrop-blur bg-opacity-90`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl mr-4 flex items-center">
            <span className="text-purple-500 mr-1">F</span>
            <span className={darkMode ? 'text-white' : 'text-gray-800'}>renz</span>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">          

          {/* Theme toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-circle btn-ghost"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

         
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring-2 ring-purple-500 ring-offset-2 ring-offset-base-100"
              >
                <div className="w-10 rounded-full">
                  <img alt="Avatar utilisateur" src="" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className={`menu dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
              >
                <li>
                  <a href="/profile" className={darkMode ? 'text-white' : 'text-gray-800'}>
                    Profil
                  </a>
                </li>
                <li>
                  <a href="/settings" className={darkMode ? 'text-white' : 'text-gray-800'}>
                    Paramètres
                  </a>
                </li>
                <li>
                  <div>
                    <LogoutButton />
                  </div>
                </li>
              </ul>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;