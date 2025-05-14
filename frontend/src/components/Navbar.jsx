import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Fuse from "fuse.js"
import axios from 'axios'
import { LogOut } from 'lucide-react';
import { API_URL } from '../config';
const Navbar = ({ darkMode, setDarkMode }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null)


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
      console.error('Erreur lors de la récupération de l\'utilisateur :', err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/post-frenzs?populate=*`);
        setPosts(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts :", error);
      }
    };

    fetchUser()
    fetchPosts();
  }, []);

  const navigate = useNavigate();

  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  const handleSearch = async (query) => {
    setQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    const validPosts = posts.filter(post => post.title && post.thematique);
    const fuse = new Fuse(validPosts, {
      keys: ["title", "thematique"],
      threshold: 0.3,
    });
    const results = fuse.search(query);
    setSearchResults(results.map((result) => result.item));
    setIsLoading(false);
  };

  const highlightMatch = (text, query) => {
    if (!text) return ""
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, (match) => `<span class="bg-yellow-200">${match}</span>`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
  }


  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 py-3 px-4 justify-between">
      <div className="navbar-center">
        <Link to="/" className="block">
          <h1 className="text-2xl font-bold font-baloo">
            <span className="text-[#9333ea]">F</span>renz
          </h1>
        </Link>
      </div>

      <div className="navbar-end gap-2 items-center justify-end space-x-1">
        {!showSearch ? (
          <button className="btn btn-ghost btn-circle" onClick={() => setShowSearch(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        ) : (
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="input input-bordered w-32 md:w-auto"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
            {query && (
              <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50 max-h-48 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((post) => (
                      <li key={post.id} className="p-2 border-b hover:bg-gray-100">
                        <Link
                          to={`/post/${post.documentId}`}
                          className="font-semibold text-blue-600 hover:underline"
                          onMouseDown={(e) => e.preventDefault()}
                          dangerouslySetInnerHTML={{ __html: highlightMatch(post.title, query) }}
                        />
                        <Link
                          to={`/f/${post.thematique}`}
                          className="text-sm text-gray-500 hover:underline block"
                          onMouseDown={(e) => e.preventDefault()}
                          dangerouslySetInnerHTML={{ __html: highlightMatch(post.thematique, query) }}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-gray-500 text-center">Aucun résultat trouvé</div>
                )}
              </div>
            )}
          </div>
        )}

        <button
          className="btn btn-ghost btn-circle"
          onClick={handleNotificationsClick}
        >
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors"
          >
            {user && user.image ? (
              <img
                src={`${user.image.url}`}
                alt={user.image.alternativeText || 'Avatar'}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
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
            <span className="text-white text-sm font-medium">
              {user ? user.username || 'User' : 'Guest'}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border border-gray-700"
          >
            <li><Link to="/profile">Profil</Link></li>
            <li><Link to="/settings">Paramètres</Link></li>
            <li><Link to='/savedPost'>Enregistrement</Link></li>
            <li><Link to='/login' onClick={handleLogout}>Déconnexion</Link></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;