import React, { useEffect, useState } from 'react';
import { TrendingUp, ChevronRight, PlusCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users } from 'lucide-react';

const RightSideBar = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const fetchTrendingTopics = async () => {
    try {
      const response = await fetch('https://rss.app/feeds/v1.1/tO0XAXevvzTShx7z.json');
      const data = await response.json();
      const trends = data.items.map((item) => ({
        title: item.title,
        link: item.url,
        category: item.categories ? item.categories[0] : 'Tech',
        pubDate: item.date_published,
      }));
      setTrendingTopics(trends);
    } catch (error) {
      console.error('Erreur lors de la récupération des tendances :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const handleShowLess = () => {
    setVisibleCount((prevCount) => Math.max(prevCount - 3, 3));
  };

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const whoToFollow = [
    {
      name: 'Netflix',
      handle: '@netflix',
      avatar: 'src/assets/images/netflix.png',
      verified: true,
    },
    {
      name: 'Adele',
      handle: '@adele',
      avatar: 'src/assets/images/Adele.webp',
      verified: true,
    },
    {
      name: 'Nana 🎀',
      handle: '@cxxhime',
      avatar: 'src/assets/images/Snowy.jpg',
      verified: false,
    },
  ];

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:1337/api/users/me?populate=*', {
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
    fetchTrendingTopics();
  }, []);

  return (
    <aside className="hidden lg:block w-[750px] space-y-6 sticky top-20 self-start sidebar-scroll">
      <Link
        to="/addpost"
        className="bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl block text-center shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium"
      >
        <PlusCircle size={18} />
        <span>Créer un post</span>
      </Link>
      <div className="bg-[#1f1f23] p-6 rounded-2xl shadow-2xl border border-base-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-purple-500" />
            <span>Tendances Tech</span>
          </h2>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Chargement des tendances...</p>
        ) : (
          <div className="space-y-6">
            {trendingTopics.slice(0, visibleCount).map((item, idx) => (
              <div
                key={idx}
                className="bg-base-100 rounded-xl border border-base-300 p-4 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-white text-sm leading-snug group-hover:text-gray-200 transition-colors line-clamp-2">
                    {item.title}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{new Date(item.pubDate).toLocaleDateString('fr-FR')}</span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors flex items-center cursor-pointer"
                    >
                      Lire plus
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-4">
              {visibleCount < trendingTopics.length && (
                <button
                  onClick={handleShowMore}
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold"
                >
                  Afficher plus de tendances
                </button>
              )}
              {visibleCount > 3 && (
                <button
                  onClick={handleShowLess}
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold"
                >
                  Afficher moins de tendances
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="bg-[#1f1f23] p-6 rounded-2xl shadow-2xl border border-base-300">
        <h3 className="text-white font-semibold mb-3">Restez informé</h3>
        <p className="text-gray-400 text-sm mb-4">
          Inscrivez-vous pour recevoir les dernières tendances directement dans votre boîte de réception.
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Votre email"
            className="w-full input input-bordered input-sm bg-base-100 text-white border-base-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          <button className="btn btn-sm bg-purple-600 hover:bg-purple-700 border-none text-white">
            S'inscrire
          </button>
        </div>
      </div>
      {/* Suggestions */}
      <div className="bg-[#1f1f23] p-6 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users size={18} className="text-purple-500" />
            <span>Suggestions</span>
          </h2>
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-xs btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <ul className="divide-y divide-base-700">
          {whoToFollow.map((user, idx) => (
            <li
              key={idx}
              className="py-3 first:pt-0 last:pb-0 group hover:bg-base-800/20 -mx-2 px-2 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover group-hover:ring-2 group-hover:ring-purple-600/30 transition-all"
                    />
                    {user.verified && (
                      <span className="absolute -right-1 -bottom-1 bg-purple-600 rounded-full p-0.5 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center gap-1">
                      <p className="text-white font-medium group-hover:text-purple-400 transition-colors">
                        {user.name}
                      </p>
                      {user.mutualFriends > 0 && (
                        <span className="text-xs bg-base-700/60 text-gray-400 px-1.5 rounded-full">
                          {user.mutualFriends}+
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs">{user.handle}</p>
                  </div>
                </div>
                <button className="btn btn-sm bg-purple-600 hover:bg-purple-700 border-none text-white rounded-full px-4">
                  Suivre
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-4 border-t border-base-100">
          <a
            href="/suggestions"
            className="flex items-center justify-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors font-medium"
          >
            Voir plus de suggestions
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
