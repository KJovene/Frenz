import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import LeftSideBar from '../components/LeftSideBar.jsx'
import RightSideBar from '../components/RightSidebar.jsx'
import { Trash, PencilLine, Ellipsis } from 'lucide-react';
import Comments from '../components/Comments.jsx'
import EditComment from './EditComment.jsx'

function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const [editPost, setEditPost] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [isEditCommentOpen, setIsEditCommentOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [commentaires, setCommentaires] = useState([]);

    const fetchPost = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:1337/api/post-frenzs/${id}?populate=*`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setPost(response.data.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du post :', error);
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
          navigate('/'); // Navigate back to home after deletion
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
          setCommentaires((prevCommentaires) => 
            prevCommentaires.filter((comment) => comment.id !== commentId)
          );
          await fetchComments(); // Refresh comments after deletion
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire :', error);
      }
    };

    const addComment = async (newComment) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:1337/api/comments-frenzs', 
            { data: newComment },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          if (response.status === 200) {
            setCommentaires((prevCommentaires) => [...prevCommentaires, response.data.data]);
            await fetchComments(); // Refresh comments after adding
          }
        } catch (error) {
          console.error('Erreur lors de l\'ajout du commentaire :', error);
        }
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);
    
    return (
        <div className="flex gap-9 max-w-1xl mx-auto py-8 pl-0 pr-4">
          <LeftSideBar />

          <div className="h-screen flex flex-col items-center w-full">
            <div className="w-3/4">
              <div className="border p-4 mb-4 shadow rounded-lg bg-[#1f1f23] text-white">
                <p className='flex justify-between'>
                  <strong>{post.author?.username || 'Inconnu'}</strong>
                  <span className="text-gray-400">
                    {post.createdAt && `${new Date(post.createdAt).toLocaleDateString('fr-FR')} à ${new Date(post.createdAt).toLocaleTimeString('fr-FR')}`}
                  </span>
                </p>
                <div className='flex justify-between items-center'>
                  <h2 className="text-xl font-semibold">{post.title || post.title_frenz}</h2>
                
                  <div className="relative">
                    <button
                      onClick={() => setEditPost(!editPost)}
                      className="btn btn-ghost btn-circle"
                    >
                      <Ellipsis />
                    </button>

                    {editPost && (
                      <div
                        className="absolute right-0 mt-2 w-40 bg-[#2a2a2e] rounded-lg shadow-lg z-10"
                        onMouseLeave={() => setEditPost(false)}
                      >
                        <ul className="py-2">
                          <li>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-900/20"
                            >
                              <Trash className="inline-block mr-2" />
                              Supprimer
                            </button>
                          </li>
                          <li>
                            <Link to={`/editpost/${post.documentId}`}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                            >
                              <PencilLine className="inline-block mr-2" />
                              Modifier
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <Link
                  to={`/f/${post.thematique}`}
                  className={`px-4 py-1 rounded-full text-white text-sm font-semibold inline-block mt-2 ${
                    post.thematique === 'général'
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
                  #{post.thematique}
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

                <p className='py-4 text-gray-300'>{post.description || post.content}</p>

                <div className="mt-6 border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-bold mb-4">Commentaires</h3>
                  {commentaires
                    .filter((commentaire) => commentaire.post_frenz && commentaire.post_frenz.id === post.id)
                    .map((commentaire) => (
                      <div key={commentaire.id} className="flex justify-between items-center p-3 bg-[#2a2a2e] rounded-lg mb-3">
                        <div>
                          <p className="text-sm font-semibold">{commentaire.user?.username || 'Anonyme'}</p>
                          <p className="text-gray-300">{commentaire.commentaire}</p>
                        </div>
                        <div className="relative">
                          {isEditCommentOpen && selectedComment?.id === commentaire.id && (
                            <EditComment
                              comment={selectedComment}
                              onClose={() => setIsEditCommentOpen(false)}
                              onCommentUpdated={(updatedComment) => {
                                setCommentaires((prevCommentaires) =>
                                  prevCommentaires.map((comment) => {
                                    if (comment.id === updatedComment.id) {
                                      return { ...comment, commentaire: updatedComment.commentaire };
                                    }
                                    return comment;
                                  })
                                );
                                setIsEditCommentOpen(false);
                              }}
                            />
                          )}
                          <button
                            onClick={() => setEditComment((prev) => (prev === commentaire.id ? null : commentaire.id))}
                            className="btn btn-ghost btn-circle"
                          >
                            <Ellipsis size={18} />
                          </button>

                          {editComment === commentaire.id && (
                            <div
                              className="absolute right-0 mt-2 w-40 bg-[#2a2a2e] border border-gray-700 rounded-lg shadow-lg z-10"
                              onMouseLeave={() => setEditComment(false)}
                            >
                              <ul className="py-2">
                                <li>
                                  <button
                                    onClick={() => handleDeleteComment(commentaire.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-900/20"
                                  >
                                    <Trash className="inline-block mr-2" size={16} />
                                    Supprimer
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => {
                                      setSelectedComment(commentaire);
                                      setIsEditCommentOpen(true);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                  >
                                    <PencilLine className="inline-block mr-2" size={16} />
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

                <Comments 
                  id={post.id} 
                  onCommentAdded={(newComment) => {
                    addComment({
                      post_frenz: post.id,
                      commentaire: newComment.commentaire
                    });
                  }} 
                />
              </div>
            </div>
          </div>

          <RightSideBar />
        </div>
    )
}

export default PostPage;