import { useState, useEffect } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom";
import axios from "axios";

// Importation de vos composants
import Navbar from "./components/Navbar";
import Homepage from "./components/features/Homepage";
import SubredditPage from "./components/features/SubredditPage";
import PostDetailPage from "./components/features/PostDetailPage";
import CreatePostPage from "./components/features/CreatePostPage";
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx";
import ProfilePage from "./components/features/ProfilePage";
import SearchResultsPage from "./components/features/SearchResultsPage";
import NotFoundPage from "./components/features/NotFoundPage";

// Configuration d'Axios pour inclure le token
const setupAxiosInterceptors = (token) => {
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Vérification de l'authentification au chargement
  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          // Configurer Axios avec le token
          setupAxiosInterceptors(token);

          // Vérifier la validité du token auprès de Strapi
          const response = await axios.get('http://votre-api-strapi.com/api/users/me');
          setUser(response.data);
        }
      } catch (error) {
        // Token invalide, déconnexion
        console.error("Token invalide ou expiré", error.response?.data || error.message);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    setupAxiosInterceptors(authToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    axios.interceptors.request.eject(); // Supprimer l'intercepteur
  };

  // Route protégée pour les composants nécessitant une authentification
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    }

    return user ? children : <Navigate to="/login" replace />;
  };

  return (

    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="min-h-screen bg-base-100">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/r/:subredditName" element={<SubredditPage />} />
            <Route path="/post/:postId" element={<PostDetailPage />} />
            
            {/* Routes protégées */}
            <Route 
              path="/create-post" 
              element={
                // <ProtectedRoute>
                  <CreatePostPage user={user} />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage user={user} />
                </ProtectedRoute>
              } 
            />

            {/* Routes d'authentification */}
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/register" 
              element={<Register />} 
            />

            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        <footer className="footer p-10 bg-base-200 text-base-content">
          <div>
            <span className="footer-title">© {new Date().getFullYear()} CloneReddit</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

