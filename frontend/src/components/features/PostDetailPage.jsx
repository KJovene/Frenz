import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useClient } from "@liveblocks/react";

// Composant de commentaire
const Comment = ({ comment, level = 0 }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  
  const handleSubmitReply = (e) => {
    e.preventDefault();
    // Ici, vous feriez un appel API pour soumettre le commentaire
    console.log("Réponse soumise:", replyContent);
    setReplyContent("");
    setShowReplyForm(false);
  };
  
  return (
    <div className={`mb-4 ${level > 0 ? 'ml-8 pl-4 border-l-2 border-gray-200' : ''}`}>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-2">
          <img
            src={comment.author.avatar || "https://via.placeholder.com/40"}
            alt={comment.author.username}
            className="h-6 w-6 rounded-full mr-2"
          />
          <span className="text-sm font-medium text-gray-700">
            {comment.author.username}
          </span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-xs text-gray-500">
            il y a {comment.timeAgo}
          </span>
        </div>
        
        <div className="text-gray-800 mb-3">
          {comment.content}
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <button
            className="flex items-center mr-4 hover:text-orange-500"
            aria-label="Upvote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span>{comment.upvotes || 0}</span>
          </button>
          
          <button
            className="flex items-center mr-4 hover:text-blue-500"
            aria-label="Downvote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span>{comment.downvotes || 0}</span>
          </button>
          
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center mr-4 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span>Répondre</span>
          </button>
        </div>
        
        {/* Formulaire de réponse */}
        {showReplyForm && (
          <form onSubmit={handleSubmitReply} className="mt-3">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Écrire une réponse..."
              rows="3"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-end space-x-2 mt-2">
              <button
                type="button"
                onClick={() => setShowReplyForm(false)}
                className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Répondre
              </button>
            </div>
          </form>
        )}
      </div>
      
      {/* Commentaires imbriqués */}
      {comment.replies && comment.replies.map(reply => (
        <Comment key={reply.id} comment={reply} level={level + 1} />
      ))}
    </div>
  );
};

// Page principale de détail d'un post
const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState(0);
  
  // Intégration de Liveblocks pour la collaboration en temps réel
  const client = useClient();
  
  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      // Ici, vous feriez un appel API pour récupérer les détails du post
      const mockPost = {
        id: postId,
        title: "Exemple de post avec l'ID " + postId,
        content: "Ceci est le contenu détaillé du post. Il peut contenir beaucoup plus de texte que la version abrégée affichée dans la carte du post sur la page d'accueil.",
        author: "utilisateur123",
        subreddit: "exemple",
        timeAgo: "3 heures",
        votes: 42,
        commentCount: 5,
        image: "https://via.placeholder.com/800x400"
      };
      
      const mockComments = [
        {
          id: "comment1",
          content: "C'est un excellent post! Voici mon commentaire détaillé qui apporte une perspective intéressante sur le sujet abordé.",
          author: { username: "commentateur1", avatar: null },
          timeAgo: "2 heures",
          upvotes: 15,
          downvotes: 2,
          replies: [
            {
              id: "reply1",
              content: "Je suis d'accord avec ce commentaire. Voici quelques points supplémentaires à considérer.",
              author: { username: "repondeur1", avatar: null },
              timeAgo: "1 heure",
              upvotes: 5,
              downvotes: 0
            }
          ]
        },
        {
          id: "comment2",
          content: "J'ai une question à propos de ce que vous avez mentionné dans le troisième paragraphe. Pourriez-vous clarifier?",
          author: { username: "questionneur", avatar: null },
          timeAgo: "30 minutes",
          upvotes: 3,
          downvotes: 0,
          replies: []
        }
      ];
      
      setPost(mockPost);
      setComments(mockComments);
      setLoading(false);
    }, 1000);
    
    // Connexion à Liveblocks pour voir les utilisateurs actifs
    const room = client.enter("post-" + postId);
    
    room.subscribe("presence", (presence) => {
      // Mettre à jour le nombre d'utilisateurs actifs
      setActiveUsers(Object.keys(presence).length);
    });
    
    return () => {
      // Nettoyage: déconnexion de la room Liveblocks
      client.leave("post-" + postId);
    };
  }, [postId, client]);
  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    // Ici, vous feriez un appel API pour soumettre le commentaire
    const newCommentObj = {
      id: `new-comment-${Date.now()}`,
      content: newComment,
      author: { username: "utilisateur_courant", avatar: null },
      timeAgo: "à l'instant",
      upvotes: 0,
      downvotes: 0,
      replies: []
    };
    
    // Ajouter le nouveau commentaire à la liste locale (optimistic update)
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    
    // Notification aux autres utilisateurs via Liveblocks
    client.broadcastEvent("post-" + postId, { type: "new-comment", comment: newCommentObj });
  };
  
  // Écouter les événements Liveblocks pour les nouveaux commentaires
  useEffect(() => {
    const unsubscribe = client.subscribe("post-" + postId, (event) => {
      if (event.type === "new-comment") {
        // Vérifier que le commentaire n'existe pas déjà
        if (!comments.some(c => c.id === event.comment.id)) {
          setComments(prevComments => [event.comment, ...prevComments]);
        }
      }
    });
    
    return unsubscribe;
  }, [postId, client, comments]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Post non trouvé</h2>
        <p className="mt-2 text-gray-600">Le post que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
          Retour à l'accueil
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4">
      {/* En-tête du post */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <Link to={`/r/${post.subreddit}`} className="text-sm text-orange-500 hover:underline">
            r/{post.subreddit}
          </Link>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-500">
            Posté par u/{post.author} il y a {post.timeAgo}
          </span>
          
          {/* Indicateur d'utilisateurs actifs */}
          <div className="ml-auto flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            {activeUsers} en ligne
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-auto object-cover rounded-md mb-4"
          />
        )}
        
        <div className="text-gray-800 mb-6 whitespace-pre-line">{post.content}</div>
        
        {/* Actions sur le post */}
        <div className="flex items-center border-t pt-4">
          <div className="flex items-center mr-6">
            <button className="text-gray-400 hover:text-orange-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <span className="mx-2 font-medium">{post.votes}</span>
            <button className="text-gray-400 hover:text-blue-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          <button className="flex items-center mr-6 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{post.commentCount} commentaires</span>
          </button>
          
          <button className="flex items-center mr-6 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Partager</span>
          </button>
          
          <button className="flex items-center text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>Sauvegarder</span>
          </button>
        </div>
      </div>
      
      {/* Section des commentaires */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Commentaires</h2>
        
        {/* Formulaire pour ajouter un commentaire */}
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Qu'en pensez-vous?"
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Commenter
            </button>
          </div>
        </form>
        
        {/* Liste des commentaires */}
        {comments.length > 0 ? (
          <div>
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 my-8">
            Aucun commentaire pour l'instant. Soyez le premier à commenter!
          </p>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;