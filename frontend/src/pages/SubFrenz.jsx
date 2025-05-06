import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import LeftSideBar from '../components/LeftSideBar.jsx';
import RightSideBar from '../components/RightSidebar.jsx';
import Comments from '../components/Comments.jsx';

import { Trash } from 'lucide-react';

const SubFrenz = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { thematique } = useParams();
  const [commentaires, setCommentaires] = useState([]);

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

  const filteredPosts = thematique
    ? posts.filter((post) => post.thematique === thematique)
    : posts;

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
          {filteredPosts.length > 0 ? (
            [...filteredPosts].reverse().map((post) => (

              <div key={post.id} className="border p-4 mb-4 shadow">
                <p className='flex justify-between'>
                  <strong>{post.author?.username || 'Inconnu'}</strong>
                  {new Date(post.createdAt).toLocaleDateString('fr-FR')} à {new Date(post.createdAt).toLocaleTimeString('fr-FR')}
                </p>
                <div className='flex justify-between items-center'>
                  <h2 className="text-xl font-semibold">{post.title || post.title_frenz}</h2>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    <Trash />
                  </button>
                </div>

                <Link
                  to={`/post/${post.thematique}`}
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
                        <button
                          onClick={() => handleDeleteComment(commentaire.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          <Trash />
                        </button>
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

export default SubFrenz;