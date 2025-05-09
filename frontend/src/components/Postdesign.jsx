// ✅ Final Rewrite of Postdesign.jsx with full dark mode, animations, and comment edit logic
import React, { useEffect, useState } from 'react';
import {
  Heart, MessageCircle, Share2, Ellipsis, Trash,
  PencilLine, Send, ThumbsUp
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const Postdesign = ({
  post,
  commentaires,
  handleDeletePost,
  toggleComments,
  visibleComments,
  addComment,
  editPost,
  setEditPost,
  handleDeleteComment,
  editComment,
  setEditComment,
  isEditCommentOpen,
  setIsEditCommentOpen,
  selectedComment,
  setSelectedComment
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 30));
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [updatedComment, setUpdatedComment] = useState('');

  useEffect(() => {
    const related = commentaires.filter(c => c.post_frenz?.id === post.id);
    setPostComments(related);
  }, [commentaires, post.id]);

  useEffect(() => {
    if (selectedComment && isEditCommentOpen) {
      setUpdatedComment(selectedComment.commentaire);
    }
  }, [selectedComment, isEditCommentOpen]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment({ post_frenz: post.id, commentaire: commentText });
      setCommentText('');
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:1337/api/comments-frenzs/${selectedComment.documentId}`,
        {
          data: { commentaire: updatedComment },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setPostComments(prev =>
          prev.map(c => c.id === response.data.data.id ? response.data.data : c)
        );
        setIsEditCommentOpen(false);
      }
    } catch (err) {
      console.error('Erreur update commentaire', err);
    }
  };

  return (
    <div className="bg-[#1f1f23] border border-base-300 rounded-2xl shadow-2xl p-6 mb-8 w-full text-white">
      {/* Post Header */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-800 text-white rounded-full flex items-center justify-center font-bold">
            {post.author?.username?.charAt(0).toUpperCase() || '?'}
          </div>
          <div>
            <p className="font-semibold">{post.author?.username || 'Inconnu'}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString('fr-FR')} à {new Date(post.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
        <div className="relative">
          <button onClick={() => setEditPost(prev => (prev === post.id ? null : post.id))} className="p-2 hover:bg-gray-800 rounded-full">
            <Ellipsis size={20} className="text-gray-300" />
          </button>
          {editPost === post.id && (
            <div className="absolute right-0 mt-2 w-44 bg-[#2a2a2e] border border-gray-700 rounded-xl shadow-lg z-20 transition-all duration-200 transform scale-95 hover:scale-100">
              <button
                onClick={() => navigate(`/editpost/${post.documentId}`)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-purple-400"
              >
                <PencilLine size={16} /> Modifier
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300"
              >
                <Trash size={16} /> Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title & Tag */}
      <Link to={`/post/${post.documentId}`}>
        <h2 className="text-xl font-bold mb-2">{post.title || post.title_frenz}</h2>
      </Link>
      <Link
        to={`/f/${post.thematique}`}
        className={`inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full`}
        style={{
          backgroundColor: post.color || '#808080', // Couleur par défaut : gris
          color: '#ffffff',
        }}
      >
        {post.thematique}
      </Link>

      {/* Images */}
      {post.image?.map(media => (
        <div key={media.id} className="mb-4 rounded-xl overflow-hidden">
          <img
            src={`http://localhost:1337${media.url}`}
            alt={media.alternativeText || ''}
            className="w-full object-cover max-h-[500px] hover:opacity-95 transition-all duration-300"
          />
        </div>
      ))}

      {/* Description */}
      {post.description && <p className="text-sm text-gray-300 mb-4">{post.description}</p>}

      {/* Like & Comment Count */}
      <div className="flex justify-between text-xs text-gray-400 border-t pt-4">
        <span className="flex items-center gap-1">
          <ThumbsUp size={14} /> {likeCount} j'aime
        </span>
        <span className="cursor-pointer text-purple-400 hover:text-purple-300" onClick={() => toggleComments(post.id)}>
          {postComments.length} commentaire{postComments.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-5 gap-3">
        <button
          onClick={handleLike}
          className={`flex-1 py-2 rounded-xl font-medium transition-all ${isLiked ? 'bg-purple-800/30 text-purple-300' : 'bg-base-100 text-white hover:bg-base-200'}`}
        >
          <Heart size={16} className="inline mr-2" /> {isLiked ? 'Aimé' : "J'aime"}
        </button>
        <button
          onClick={() => toggleComments(post.id)}
          className="flex-1 py-2 rounded-xl bg-base-100 text-white hover:bg-base-200"
        >
          <MessageCircle size={16} className="inline mr-2" /> Commenter
        </button>
        <button
          onClick={() => alert("Fonction de partage à venir")}
          className="flex-1 py-2 rounded-xl bg-base-100 text-white hover:bg-base-200"
        >
          <Share2 size={16} className="inline mr-2" /> Partager
        </button>
      </div>

      {/* Comments */}
      {visibleComments[post.id] && (
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-1 px-4 py-2 rounded-full bg-[#2a2a2e] text-sm text-white border border-base-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 disabled:bg-gray-600"
            >
              <Send size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {postComments.map(comment => (
              <div key={comment.id} className="bg-[#2a2a2e] p-4 rounded-xl relative">
                <p className="text-sm font-semibold text-white">{comment.user?.username || 'Anonyme'}</p>
                <p className="text-xs text-gray-500 mb-1">{new Date(comment.createdAt).toLocaleDateString('fr-FR')}</p>

                {isEditCommentOpen && selectedComment?.id === comment.id ? (
                  <div className="mt-2">
                    <textarea
                      value={updatedComment}
                      onChange={(e) => setUpdatedComment(e.target.value)}
                      className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                    />
                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        onClick={() => setIsEditCommentOpen(false)}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
                      >Annuler</button>
                      <button
                        onClick={handleUpdate}
                        disabled={!updatedComment.trim()}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                      >Enregistrer</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-300">{comment.commentaire}</p>
                )}

                <div className="absolute top-2 right-2">
                  <button onClick={() => setEditComment(prev => prev === comment.id ? null : comment.id)}>
                    <Ellipsis size={16} />
                  </button>
                  {editComment === comment.id && (
                    <div className="absolute right-0 mt-2 w-44 bg-[#2a2a2e] border border-gray-700 rounded-xl shadow-lg z-20 transition-all duration-200 transform scale-95 hover:scale-100">
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300"
                      >
                        Supprimer
                      </button>
                      <button
                        onClick={() => {
                          setSelectedComment(comment);
                          setIsEditCommentOpen(true);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-purple-400"
                      >
                        Modifier
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Postdesign;
