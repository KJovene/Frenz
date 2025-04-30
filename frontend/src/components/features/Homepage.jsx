import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Mock data pour le développement
        const mockPosts = [
          { 
            id: '1', 
            title: 'Premier Post', 
            content: 'Contenu du premier post', 
            subreddit: 'Général' 
          },
          { 
            id: '2', 
            title: 'Deuxième Post', 
            content: 'Contenu du deuxième post', 
            subreddit: 'Technologie' 
          }
        ];

        // Décommenter et adapter quand l'API Strapi sera prête
        // const response = await axios.get('http://votre-api-strapi/api/posts');
        // const posts = response.data.data.map(item => ({
        //   id: item.id,
        //   title: item.attributes.title,
        //   content: item.attributes.content,
        //   subreddit: item.attributes.subreddit
        // }));

        setPosts(mockPosts);
        setLoading(false);
      } catch (error) {
        console.error('Erreur de chargement des posts:', error);
        setError('Impossible de charger les posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Accueil</h1>

      {posts.length === 0 ? (
        <div className="text-center text-gray-600">
          Aucun post disponible
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 line-clamp-3">{post.content}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {post.subreddit || 'Non classé'}
                </span>
                <a 
                  href={`/post/${post.id}`} 
                  className="text-orange-500 hover:underline"
                >
                  Lire plus
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;