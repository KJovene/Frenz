import React, { useEffect, useState } from 'react';
import {
  Heart, MessageCircle, Ellipsis, Trash,
  PencilLine, Send, ThumbsUp, Bookmark
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

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
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [updatedComment, setUpdatedComment] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [user, SetUser] = useState({})

  useEffect(() => {
    const related = commentaires.filter(c => c.post_frenz?.id === post.id);
    setPostComments(related);


  }, [commentaires, post.id]);

  useEffect(() => {

    checkIfLiked();
  }, [post.likedBy])

  useEffect(() => {
    if (selectedComment && isEditCommentOpen) {
      setUpdatedComment(selectedComment.commentaire);
    }
  }, [selectedComment, isEditCommentOpen]);

  useEffect(() => {
    checkIfSaved();
  }, [post.savedBy]);

  const checkIfSaved = async () => {
    const token = localStorage.getItem('token');
    const userResponse = await axios.get(`${API_URL}/users/me?populate=*`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userId = userResponse.data.id;
    SetUser(userResponse.data)
    const isSavedByUser = post.savedBy?.some(user => user.id === userId);

    setIsSaved(isSavedByUser);
  };

  const checkIfLiked = async () => {
    const token = localStorage.getItem('token');
    const userResponse = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userId = userResponse.data.id;

    const isLikedByUser = post.likedBy?.some(user => user.id === userId);
    setIsLiked(isLikedByUser);
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');

      const userResponse = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = userResponse.data.id;

      const isCurrentlyLiked = post.likedBy?.some(user => user.id === userId);

      const updatedLikedBy = isCurrentlyLiked
        ? post.likedBy.filter(user => user.id !== userId).map(user => user.id)
        : [...(post.likedBy || []).map(user => user.id), userId];

      const postData = {
        data: {
          likedBy: updatedLikedBy,
          likes: updatedLikedBy.length,
        },
      };

      const response = await axios.put(
        `${API_URL}/post-frenzs/${post.documentId}`,
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (response.status === 200) {
        setIsLiked(!isCurrentlyLiked);
        setLikeCount(response.data.data.likes);

        post.likedBy = isCurrentlyLiked
          ? post.likedBy.filter(user => user.id !== userId)
          : [...(post.likedBy || []), { id: userId }];
      }
    } catch (err) {
      console.error('Erreur lors de la gestion des likes :', err.response?.data || err.message);
    }
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
        `${API_URL}/comments-frenzs/${selectedComment.documentId}?populate=*`,
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

  const handleSavePost = async () => {
    try {
      const token = localStorage.getItem('token');

      const userResponse = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = userResponse.data.id;

      const isCurrentlySaved = post.savedBy?.some(user => user.id === userId);

      const updatedSavedBy = isCurrentlySaved
        ? post.savedBy.filter(user => user.id !== userId).map(user => user.id)
        : [...(post.savedBy || []).map(user => user.id), userId];

      const postData = {
        data: {
          savedBy: updatedSavedBy,
        },
      };

      const response = await axios.put(
        `${API_URL}/post-frenzs/${post.documentId}`,
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {

        setIsSaved(!isCurrentlySaved);

        post.savedBy = isCurrentlySaved
          ? post.savedBy.filter(user => user.id !== userId)
          : [...(post.savedBy || []), { id: userId }];
      }
    } catch (err) {
      console.error('Erreur lors de la gestion des likes :', err.response?.data || err.message);
    }
  };
  return (
    <div className="bg-[#1f1f23] border border-base-300 rounded-2xl shadow-2xl p-6 mb-8 w-full text-white post-card">
      <div className="flex justify-between mb-4">
        <Link to={post.author.id === user.id ? `/profile` : `/profile/${post.author.id}`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-800 text-white rounded-full flex items-center justify-center font-bold">
              {post.author.image ? (
                <img
                  src={`${post.author.image.url}`}
                  alt={post.author.username || 'Auteur'}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-purple-800 text-white rounded-full flex items-center justify-center font-bold">
                  {post.author?.username?.charAt(0).toUpperCase() || '?'}
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold">{post.author?.username || 'Inconnu'}</p>
              <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString('fr-FR')} à {new Date(post.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </Link>
        <div className="relative">
          {post.author.id === user.id ? (
          <button onClick={() => setEditPost(prev => (prev === post.id ? null : post.id))} className="p-2 hover:bg-gray-800 rounded-full">
            <Ellipsis size={20} className="text-gray-300" />
          </button>):(<></>)}
          {editPost === post.id && (
            <>
              <div onClick={() => setEditPost(null)} className='fixed top-0 left-0 h-screen w-screen z-[1000]'></div>
              <div className="absolute right-0 mt-2 w-44 z-[1001] bg-[#2a2a2e] border border-gray-700 rounded-xl shadow-lg z-20 transition-all duration-200 transform scale-95 hover:scale-100">
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
            </>
          )}

        </div>
      </div>

      <Link to={`/post/${post.documentId}`}>
        <h2 className="text-xl font-bold mb-2">{post.title || post.title_frenz}</h2>
      </Link>
      <Link
        to={`/f/${post.thematique}`}
        className={`inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full`}
        style={{
          backgroundColor: post.color || '#808080',
          color: '#ffffff',
        }}
      >
        {post.thematique}
      </Link>

      {post.image?.map(media => (
        <div key={media.id} className="mb-4 rounded-xl overflow-hidden">
          <img
            src={`${media.url}`}
            alt={media.alternativeText || ''}
            className="w-full object-cover max-h-[500px] hover:opacity-95 transition-all duration-300"
          />
        </div>
      ))}

      {post.description && <p className="text-sm text-gray-300 mb-4 post-content">{post.description}</p>}

      <div className="flex justify-between text-xs text-gray-400 border-t pt-4">
        <span className="flex items-center gap-1">
          <ThumbsUp size={14} /> {likeCount} j'aime
        </span>
        <span className="cursor-pointer text-purple-400 hover:text-purple-300" onClick={() => toggleComments(post.id)}>
          {postComments.length} commentaire{postComments.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex mt-5 gap-3">
        <button
          onClick={handleLike}
          className={`flex-1 py-2 rounded-xl font-medium transition-all ${isLiked ? 'bg-purple-800/30 text-purple-300' : 'bg-base-100 text-white hover:bg-base-200'
            }`}
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
          onClick={handleSavePost}
          className={`flex-1 py-2 rounded-xl font-medium transition-all ${isSaved ? 'bg-purple-800/30 text-purple-300' : 'bg-base-100 text-white hover:bg-base-200'
            }`}        >
          <Bookmark size={16} className="inline mr-2" /> Enregistrer
        </button>
      </div>

      {visibleComments && (
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
                <p className="text-sm font-semibold text-white">{comment.author?.username || 'Anonyme'}</p>
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
                  {comment.author.id === user.id ? (
                  <button onClick={() => setEditComment(prev => prev === comment.id ? null : comment.id)}>
                    <Ellipsis size={16} />
                  </button>
                  ):(<></>)}
                  {editComment === comment.id && (
                    <>
                      <div onClick={() => setEditComment(null)} className='fixed top-0 left-0 h-screen w-screen z-[1000]'></div>
                      <div className="absolute right-0 mt-2 w-44 z-[1001] bg-[#2a2a2e] border border-gray-700 rounded-xl shadow-lg z-20 transition-all duration-200 transform scale-95 hover:scale-100">
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
                    </>
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