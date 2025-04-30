import { useState } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const [votes, setVotes] = useState(post.votes || 0);
  
  const handleUpvote = () => {
    // Cette fonction devra être liée à l'API quand le backend sera prêt
    setVotes(prevVotes => prevVotes + 1);
  };
  
  const handleDownvote = () => {
    // Cette fonction devra être liée à l'API quand le backend sera prêt
    setVotes(prevVotes => prevVotes - 1);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      {/* En-tête du post */}
      <div className="flex items-center mb-2">
        <Link to={`/r/${post.subreddit}`} className="text-xs text-gray-500 hover:underline">
          r/{post.subreddit}
        </Link>
        <span className="mx-1 text-gray-400">•</span>
        <span className="text-xs text-gray-500">
          Posté par u/{post.author} il y a {post.timeAgo}
        </span>
      </div>
      
      {/* Contenu du post */}
      <Link to={`/post/${post.id}`} className="block">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 object-cover rounded-md mb-2"
          />
        )}
        {post.content && (
          <p className="text-gray-700 mb-3 line-clamp-3">{post.content}</p>
        )}
      </Link>
      
      {/* Pied du post */}
      <div className="flex items-center text-gray-500 text-sm">
        {/* Système de vote */}
        <div className="flex items-center mr-4">
          <button 
            onClick={handleUpvote}
            className="text-gray-400 hover:text-orange-500 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <span className="mx-1 font-medium">{votes}</span>
          <button 
            onClick={handleDownvote}
            className="text-gray-400 hover:text-blue-500 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Commentaires */}
        <Link to={`/post/${post.id}`} className="flex items-center mr-4 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{post.commentCount || 0} commentaires</span>
        </Link>
        
        {/* Partager */}
        <button className="flex items-center mr-4 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Partager</span>
        </button>
        
        {/* Sauvegarder */}
        <button className="flex items-center hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span>Sauvegarder</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;