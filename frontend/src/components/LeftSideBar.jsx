import { Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
const LeftSidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${API_URL}/users/me?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (err) {
      navigate('/login');
      console.error("Erreur lors de la récupération de l'utilisateur :", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="hidden md:block w-[750px] sticky top-20 self-start space-y-6">
      {/* Profil utilisateur */}
      <div className="bg-[#1f1f23] shadow-2xl rounded-2xl overflow-hidden">
        {/* Avatar */}
        <div className="relative flex justify-center items-center mt-4">
          {user && user.image ? (
            <img
              src={`${user.image.url}`}
              alt={user.image.alternativeText || 'Photo de profil'}
              className="w-32 h-32 rounded-full object-cover mb-2 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A4 4 0 0112 15a4 4 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Profil */}
        <div className="pt-10 pb-4 px-6 text-center">
          {user && user.username ? (
            <>
              <h2 className="text-xl font-bold text-white mb-1">{user.username}</h2>
              <p className="text-gray-400 text-sm mb-3">@{user.username}</p>
            </>
          ) : (
            <h2 className="text-xl font-bold text-gray-400 mb-1">Utilisateur inconnu</h2>
          )}
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 border-t border-b border-base-700 py-4 mb-4">
          <div className="text-center">
            <div className="text-white font-bold text-lg">6,664</div>
            <div className="text-gray-400 text-xs">Following</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-lg">9,991</div>
            <div className="text-gray-400 text-xs">Followers</div>
          </div>
        </div>

        {/* Bouton */}
        <a href="/profile" className="btn btn-primary btn-sm w-full">
          My Profile
        </a>
      </div>
    </div>
  );
};

export default LeftSidebar;