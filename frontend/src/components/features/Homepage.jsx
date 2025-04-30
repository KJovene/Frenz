import React, { useState, useEffect } from 'react';
import LeftSideBar from '../../components/LeftSideBar';
import RightSideBar from '../../components/RightSidebar'; 
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const mockPosts = [
          {
            id: '1',
            author: {
              name: "Marie Curie",
              handle: "@mcurie",
              avatar: "/api/placeholder/400/400"
            },
            title: 'Les avancées en intelligence artificielle',
            content: 'Les chercheurs en IA ont annoncé aujourd\'hui une nouvelle percée dans le traitement du langage naturel.',
            image: "/api/placeholder/600/400",
            likes: 245,
            comments: 42,
            shares: 13,
            time: "2h",
            subreddit: 'Technologie'
          }
        ];
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

  const handlePost = () => {
    if (newPost.trim() !== '') {
      const newMockPost = {
        id: Date.now().toString(),
        author: {
          name: "Vous",
          handle: "@vous",
          avatar: "/api/placeholder/400/400"
        },
        title: newPost,
        content: 'Nouveau contenu partagé avec la communauté',
        likes: 0,
        comments: 0,
        shares: 0,
        time: "à l'instant",
        subreddit: 'Général'
      };
      setPosts([newMockPost, ...posts]);
      setNewPost('');
    }
  };

  if (loading) {
    return (
      <div className="flex gap-6 max-w-7xl mx-auto px-4 py-8 bg-gray-900">

        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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
    <div className="flex gap-6 max-w-7xl mx-auto px-4 py-8">
      {/* Left Sidebar */}
      <LeftSideBar />

      {/* Main Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full space-y-6 pb-20 md:pb-0">
        {/* Create Post Box */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center space-x-3 mb-3">
            <img src="/api/placeholder/400/400" alt="Votre avatar" className="w-10 h-10 rounded-full border-2 border-purple-500" />
            <span className="font-medium text-gray-300">Partagez votre pensée</span>
          </div>
          <textarea
            className="textarea w-full bg-gray-700 border-gray-600 rounded-lg resize-none text-white placeholder-gray-400 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            rows="3"
            placeholder="Qu'est-ce qui vous inspire aujourd'hui?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-3">
            <button onClick={handlePost} className="btn bg-purple-600 hover:bg-purple-700 text-white border-none">
              Publier
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        {posts.length === 0 ? (
          <div className="text-center p-10 bg-gray-800 rounded-xl border border-gray-700">
            <p className="text-xl font-medium text-gray-300">Aucun post disponible</p>
            <p className="text-gray-400 mt-2">Soyez le premier à partager quelque chose</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-medium text-white">{post.author.name}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{post.author.handle}</span>
                      <span className="mx-1">•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
                <p className="text-gray-300 mb-4">{post.content}</p>
                {post.image && (
                  <img src={post.image} alt="" className="w-full object-cover h-64 rounded-lg mb-4" />
                )}
                <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500">
                    <Heart size={18} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500">
                    <MessageCircle size={18} />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500">
                    <Share2 size={18} />
                    <span>{post.shares}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-500">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <RightSideBar />
    </div>
  );
};

export default Homepage;
