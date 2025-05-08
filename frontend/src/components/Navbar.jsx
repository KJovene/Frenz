import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Fuse from "fuse.js"
import axios from 'axios'
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

      const response = await axios.get('http://localhost:1337/api/users/me?populate=*', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      setUser(response.data);
      console.log(user)
    } catch (err) {
      navigate('/login');
      console.error('Erreur lors de la récupération de l\'utilisateur :', err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/post-frenzs?populate=*");
        setPosts(response.data.data);
      } catch (error) {
        console.log("Erreur lors de la récupération des posts :", error);
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
    console.log(results)
    setSearchResults(results.map((result) => result.item));
    setIsLoading(false);
  };

  const highlightMatch = (text, query) => {
    if (!text) return ""
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, (match) => `<span class="bg-yellow-200">${match}</span>`);
  };
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 py-3 px-4">
      {/* Left Side */}
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
            <div className="bg-base-100 border-b border-base-100 p-4">
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
                <li><Link to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-3 hover:bg-base-200 rounded-lg"><span>Settings</span></Link></li>
              </ul>
              <div className="mt-6">
                <a
                  href="http://localhost:3030/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-outline w-full hover:text-lime-border hover:border-lime-border hover:bg-lime-border/10 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Frenz logo - Sans fond */}
      <div className="navbar-center">
        <Link to="/" className="block">
          <h1 className="text-2xl font-bold font-baloo">
            <span className="text-[#9333ea]">F</span>renz
          </h1>
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
            {/* Résultats de recherche */}
            {query && (
              <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50 max-h-48 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((post) => (
                      <li key={post.id} className="p-2 border-b hover:bg-gray-100">
                        {/* Lien vers la page PostPage pour le titre */}
                        <Link
                          to={`/post/${post.documentId}`}
                          className="font-semibold text-blue-600 hover:underline"
                          onMouseDown={(e) => e.preventDefault()}
                          dangerouslySetInnerHTML={{ __html: highlightMatch(post.title, query) }}
                        />
                        {/* Lien vers la page SubFrenz pour la thématique */}
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

        {/* Bouton de notification modifié pour naviguer vers la page des notifications */}
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

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar ring-2 ring-lime-border ring-offset-2 ring-offset-base-100"
          >
            {user && user.image ? ( // Vérifiez si user et user.image existent
              <img
                src={`http://localhost:1337${user.image.url}`}
                alt={user.image.alternativeText || 'Photo de profil'}
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                {/* Affiche une icône ou un avatar par défaut si user est null */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
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