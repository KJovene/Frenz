import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import LeftSideBar from '../../components/LeftSideBar.jsx';
import RightSideBar from '../../components/RightSideBar.jsx';
import Comments from '../../components/Comments.jsx';
import EditComment from '../../pages/EditComment.jsx';

import { Trash, PencilLine, Ellipsis } from 'lucide-react';

const Homepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [commentaires, setCommentaires] = useState([]);
  const [editPost, setEditPost] = useState(false)
  const [editComment, setEditComment] = useState(false)
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false); // Gère l'ouverture de la popup
  const [selectedComment, setSelectedComment] = useState(null); // Stocke le commentaire sélectionné

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      navigate('/login');
      console.error('Erreur lors de la récupération de l\'utilisateur :', err);
    }
  };

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:1337/api/post-frenzs?populate=*', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des posts :', error);
    }
  };

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:1337/api/comments-frenzs?populate=post_frenz', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCommentaires(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires :', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:1337/api/post-frenzs/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        console.log('Post supprimé avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du post :', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:1337/api/comments-frenzs/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCommentaires((prevCommentaires) => prevCommentaires.filter((comment) => comment.id !== commentId));
        console.log('Commentaire supprimé avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire :', error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPost();
    fetchComments();
  }, []);

  const addComment = async (newComment) => {
    setCommentaires((prevCommentaires) => [...prevCommentaires, newComment]);
    await fetchComments();
  };

  return (
    <div className="flex gap-9 max-w-1xl mx-auto py-8 pl-0 pr-4">


      <LeftSideBar />

      <div className="h-screen flex flex-col items-center w-full">
        <div className="w-3/4">
          {posts.length > 0 ? (
            [...posts].reverse().map((post) => (

              <div key={post.id} className="border p-4 mb-4 shadow">
                <p className='flex justify-between'>
                  <strong>{post.author?.username || 'Inconnu'}</strong>
                  {new Date(post.createdAt).toLocaleDateString('fr-FR')} à {new Date(post.createdAt).toLocaleTimeString('fr-FR')}
                </p>
                <div className='flex justify-between items-center'>
                  <Link to={`/post/${post.documentId}`}>
                    <h2 className="text-xl font-semibold">{post.title || post.title_frenz}</h2>
                  </Link>
                </div>
                <div className="relative">
                  {/* Bouton pour ouvrir le menu */}
                  <button
                    onClick={() => setEditPost((prev) => (prev === post.id ? null : post.id))}
                    className="btn btn-ghost btn-circle"
                  >
                    <Ellipsis />
                  </button>

                  {/* Menu déroulant */}
                  {editPost === post.id && (
                    <div
                      className="absolute left-0 top-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10"
                      onMouseLeave={() => setEditPost(false)}
                    >
                      <ul className="py-2">
                        <li>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                          >
                            <Trash className="inline-block mr-2" />
                            Supprimer
                          </button>
                        </li>
                        <li>
                          <Link to={`/editpost/${post.documentId}`}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <PencilLine className="inline-block mr-2" />
                            Modifier
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <Link
                  to={`/f/${post.thematique}`}
                  className={`px-4 py-1 rounded-full text-white text-sm font-semibold inline-block ${post.thematique === 'général'
                    ? 'bg-blue-500'
                    : post.thematique === 'game'
                      ? 'bg-green-500'
                      : post.thematique === 'sport'
                        ? 'bg-red-500'
                        : post.thematique === 'culture'
                          ? 'bg-purple-500'
                          : post.thematique === 'technologie'
                            ? 'bg-yellow-500'
                            : post.thematique === 'sante'
                              ? 'bg-pink-500'
                              : post.thematique === 'environnement'
                                ? 'bg-teal-500'
                                : post.thematique === 'education'
                                  ? 'bg-orange-500'
                                  : 'bg-gray-500'
                    }`}
                >
                  {post.thematique}
                </Link>

                {post.image?.length > 0 ? (
                  post.image.map((img) => (
                    <img
                      key={img.id}
                      src={`http://localhost:1337${img.url}`}
                      alt={img.alternativeText || post.title || 'Image du post'}
                      className="w-full h-auto mt-4 rounded-lg"
                    />
                  ))
                ) : (
                  <></>
                )}

                <p className='py-2'>{post.description || post.content}</p>


                <div className="mt-4">
                  <h3 className="text-lg font-bold">Commentaires :</h3>
                  {commentaires
                    .filter((commentaire) => commentaire.post_frenz && commentaire.post_frenz.id === post.id)
                    .map((commentaire) => (
                      <div key={commentaire.id} className="flex justify-between items-center">
                        <p className="text-gray-700">{commentaire.commentaire}</p>
                        <div className="relative">
                          {isEditCommentOpen && (
                            <EditComment
                              comment={selectedComment}
                              onClose={() => setIsEditCommentOpen(false)} // Ferme la popup
                              onCommentUpdated={(updatedComment) => {
                                // Met à jour le commentaire dans la liste
                                console.log("updatedComment", updatedComment)
                                setCommentaires((prevCommentaires) =>
                                  prevCommentaires.map((comment) => {
                                    if (comment.documentId === updatedComment.documentId) {
                                      return { ...comment, commentaire: updatedComment.commentaire };
                                    }
                                    return comment;
                                  }
                                  )
                                );
                                setIsEditCommentOpen(false);
                              }}
                            />
                          )}
                          <button
                            onClick={() => setEditComment((prev) => (prev === commentaire.id ? null : commentaire.id))}
                            className="btn btn-ghost btn-circle"
                          >
                            <Ellipsis />
                          </button>

                          {/* Menu déroulant */}
                          {editComment === commentaire.id && (
                            <div
                              className="absolute left-0 top-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10"
                              onMouseLeave={() => setEditComment(false)}
                            >
                              <ul className="py-2">
                                <li>
                                  <button
                                    onClick={() => handleDeleteComment(commentaire.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                                  >
                                    <Trash className="inline-block mr-2" />
                                    Supprimer
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => {
                                      setSelectedComment(commentaire); // Stocke le commentaire sélectionné
                                      setIsEditCommentOpen(true); // Ouvre la popup
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <PencilLine className="inline-block mr-2" />
                                    Modifier
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  {commentaires.filter((commentaire) => commentaire.post_frenz && commentaire.post_frenz.id === post.id).length === 0 && (
                    <p className="text-gray-500">Aucun commentaire sur ce post.</p>
                  )}
                </div>

                <Comments id={post.documentId} onCommentAdded={addComment} />
              </div>
            ))
          ) : (
            <p>Aucun post disponible.</p>
          )}
        </div>
      </div>

      <RightSideBar />
    </div>
  );
};

export default Homepage;