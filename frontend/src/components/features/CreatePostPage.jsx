import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const CreatePostPage = ({ user }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [image, setImage] = useState(null);
  const [subreddits, setSubreddits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    if (!user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate("/login", { state: { from: "/create-post" } });
    }
    
    // Charger la liste des subreddits disponibles
    fetchSubreddits();
  }, [user, navigate]);

  const fetchSubreddits = () => {
    // Simulation du chargement des données
    setTimeout(() => {
      // Ici, vous feriez un appel API pour récupérer les subreddits
      const mockSubreddits = [
        { id: 1, name: "programming" },
        { id: 2, name: "webdev" },
        { id: 3, name: "reactjs" },
        { id: 4, name: "javascript" },
        { id: 5, name: "webdesign" },
        { id: 6, name: "technology" }
      ];
      
      setSubreddits(mockSubreddits);
    }, 500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setImage(file);
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Le titre est requis");
      return;
    }
    
    if (!subreddit) {
      setError("Veuillez sélectionner une communauté");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Ici, vous feriez un appel API pour créer le post
      // const formData = new FormData();
      // formData.append("title", title);
      // formData.append("content", content);
      // formData.append("subreddit", subreddit);
      // if (image) formData.append("image", image);
      
      // Simulation d'un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Rediriger vers la page d'accueil ou vers le nouveau post
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création du post:", error);
      setError("Une erreur s'est produite lors de la création du post. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-gray-500 hover:text-gray-700 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Créer un post</h1>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Sélection de subreddit */}
          <div className="p-6 border-b border-gray-200">
            <label htmlFor="subreddit" className="block text-sm font-medium text-gray-700 mb-2">
              Communauté
            </label>
            <select
              id="subreddit"
              value={subreddit}
              onChange={(e) => setSubreddit(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            >
              <option value="">Sélectionner une communauté</option>
              {subreddits.map((sub) => (
                <option key={sub.id} value={sub.name}>
                  r/{sub.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Entrée du titre */}
          <div className="p-6 border-b border-gray-200">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Titre
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Un titre captivant pour votre post"
              required
              maxLength={300}
            />
            <p className="mt-1 text-xs text-gray-500 text-right">
              {title.length}/300
            </p>
          </div>
          
          {/* Entrée du contenu */}
          <div className="p-6 border-b border-gray-200">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Contenu
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Partagez vos pensées..."
            ></textarea>
          </div>
          
          {/* Téléchargement d'image */}
          <div className="p-6 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image (optionnel)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {previewImage ? (
                  <div>
                    <img 
                      src={previewImage} 
                      alt="Aperçu" 
                      className="mx-auto h-48 w-auto object-contain mb-4" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setPreviewImage(null);
                      }}
                      className="text-sm text-red-600 hover:text-red-500"
                    >
                      Supprimer l'image
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none"
                      >
                        <span>Télécharger une image</span>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF jusqu'à 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="p-6 flex items-center justify-end space-x-3">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création en cours...
                </>
              ) : (
                "Publier"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;