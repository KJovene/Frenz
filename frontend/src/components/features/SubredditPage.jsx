import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PostCard from "../PostCard";

const SubredditPage = () => {
  const { subredditName } = useParams();
  const [subreddit, setSubreddit] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("hot"); // hot, new, top
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Réinitialiser le chargement à chaque changement de subreddit
    setLoading(true);
    setError(null);
    
    // Simulation du chargement des données du subreddit
    setTimeout(() => {
      // Ici, vous feriez un appel API pour récupérer les données du subreddit
      // et ses posts associés
      
      // Si le subreddit n'existe pas
      if (subredditName === "nonexistent") {
        setError("Ce subreddit n'existe pas");
        setLoading(false);
        return;
      }
      
      const mockSubreddit = {
        name: subredditName,
        description: `Bienvenue sur r/${subredditName}, la communauté dédiée aux discussions autour de ${subredditName}.`,
        memberCount: Math.floor(Math.random() * 1000000) + 1000,
        createdAt: "2023-01-15",
        rules: [
          "1. Soyez respectueux envers les autres membres",
          "2. Pas de spam ou de contenu hors-sujet",
          "3. Pas de publicité non sollicitée",
          "4. Respectez les règles générales de Reddit"
        ],
        banner: "https://via.placeholder.com/1200x200",
        icon: null
      };
      
      const mockPosts = [
        {
          id: "post1",
          title: `Publication importante sur ${subredditName}`,
          content: `Ceci est une publication concernant ${subredditName}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          author: "user123",
          subreddit: subredditName,
          timeAgo: "3 heures",
          votes: 42,
          commentCount: 15,
          image: Math.random() > 0.5 ? "https://via.placeholder.com/800x400" : null
        },
        {
          id: "post2",
          title: `À propos de ${subredditName} et son évolution`,
          content: `Discussion à propos de l'évolution de ${subredditName} et ses perspectives futures.`,
          author: "expert_user",
          subreddit: subredditName,
          timeAgo: "1 jour",
          votes: 128,
          commentCount: 37,
          image: Math.random() > 0.5 ? "https://via.placeholder.com/800x400" : null
        },
        {
          id: "post3",
          title: `Question sur ${subredditName}`,
          content: `J'ai une question concernant ${subredditName}. Quelqu'un pourrait-il m'aider?`,
          author: "newbie",
          subreddit: subredditName,
          timeAgo: "2 jours",
          votes: 15,
          commentCount: 22,
          image: null
        },
        {
          id: "post4",
          title: `Ressources sur ${subredditName}`,
          content: `Compilation de ressources sur ${subredditName} pour les débutants et experts.`,
          author: "resource_collector",
          subreddit: subredditName,
          timeAgo: "1 semaine",
          votes: 256,
          commentCount: 45,
          image: Math.random() > 0.5 ? "https://via.placeholder.com/800x400" : null
        }
      ];
      
      setSubreddit(mockSubreddit);
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [subredditName]);

  // Fonction pour trier les posts en fonction du critère sélectionné
  const sortPosts = (posts, criterion) => {
    switch (criterion) {
      case "new":
        // Tri par date (récent au plus ancien)
        return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "top":
        // Tri par nombre de votes (décroissant)
        return [...posts].sort((a, b) => b.votes - a.votes);
      case "hot":
      default:
        // Tri par popularité (combinaison de votes et de récence)
        return [...posts].sort((a, b) => (b.votes / 10 + b.commentCount) - (a.votes / 10 + a.commentCount));
    }
  };

  const sortedPosts = sortPosts(posts, sortBy);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    // Ici, vous feriez un appel API pour s'abonner/se désabonner du subreddit
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oups! {error}</h2>
          <p className="text-gray-600 mb-6">
            Le subreddit que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Bannière du subreddit */}
      <div className="w-full h-32 md:h-48 bg-gradient-to-r from-orange-400 to-pink-500 rounded-t-lg overflow-hidden mb-4">
        {subreddit.banner && (
          <img
            src={subreddit.banner}
            alt={`Bannière de r/${subreddit.name}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      {/* En-tête du subreddit */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Icône/Logo du subreddit */}
          <div className="relative -mt-16 md:-mt-20 mb-4 md:mb-0 md:mr-6">
            <div className="h-16 w-16 md:h-24 md:w-24 rounded-full bg-white p-1 shadow-md">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                {subreddit.icon ? (
                  <img
                    src={subreddit.icon}
                    alt={`Icône de r/${subreddit.name}`}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span>r/</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Informations du subreddit */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">r/{subreddit.name}</h1>
            <p className="text-sm text-gray-500 mb-2">
              {subreddit.memberCount.toLocaleString()} membres • Créé le {new Date(subreddit.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{subreddit.description}</p>
          </div>
          
          {/* Bouton S'abonner */}
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleSubscribe}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isSubscribed
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {isSubscribed ? "Abonné" : "Rejoindre"}
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Colonne principale: Posts */}
        <div className="w-full md:w-3/4 md:pr-6">
          {/* Options de tri */}
          <div className="bg-white rounded-lg mb-4 p-2 flex shadow-sm">
            <button
              onClick={() => setSortBy("hot")}
              className={`px-4 py-2 rounded-md text-sm font-medium mr-2 ${
                sortBy === "hot" 
                ? "bg-orange-100 text-orange-500" 
                : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
                Tendances
              </span>
            </button>
            <button
              onClick={() => setSortBy("new")}
              className={`px-4 py-2 rounded-md text-sm font-medium mr-2 ${
                sortBy === "new" 
                ? "bg-orange-100 text-orange-500" 
                : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nouveaux
              </span>
            </button>
            <button
              onClick={() => setSortBy("top")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                sortBy === "top" 
                ? "bg-orange-100 text-orange-500" 
                : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
                Populaires
              </span>
            </button>
          </div>
          
          {/* Liste des posts */}
          {sortedPosts.length > 0 ? (
            <div>
              {sortedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">Aucun post disponible</h3>
              <p className="mt-2 text-gray-500">
                Il semble qu'il n'y ait pas encore de posts dans ce subreddit. Soyez le premier à en créer un!
              </p>
              <Link
                to="/create-post"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
              >
                Créer un Post
              </Link>
            </div>
          )}
        </div>
        
        {/* Colonne secondaire: Informations du subreddit et règles */}
        <div className="w-full md:w-1/4 mt-6 md:mt-0">
          {/* Bouton Créer un post */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <Link
              to={{
                pathname: "/create-post",
                state: { subreddit: subredditName }
              }}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
            >
              Créer un Post
            </Link>
          </div>
          
          {/* À propos de la communauté */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">À propos de la communauté</h3>
            <p className="text-sm text-gray-700 mb-4">{subreddit.description}</p>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center mb-3">
                <div className="flex-1">
                  <span className="block text-sm font-medium text-gray-900">Membres</span>
                  <span className="block text-2xl font-semibold text-gray-900">{subreddit.memberCount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="block text-sm font-medium text-gray-900">Créé le</span>
                <span className="block text-sm text-gray-500">{new Date(subreddit.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          {/* Règles de la communauté */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Règles de r/{subreddit.name}</h3>
            <ul className="space-y-3">
              {subreddit.rules.map((rule, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubredditPage;