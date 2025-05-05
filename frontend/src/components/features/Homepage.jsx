import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import LeftSideBar from '../../components/LeftSideBar';
import RightSideBar from '../../components/RightSidebar';
import Comments from '../../components/Comments.jsx';

const Homepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [commentaires, setCommentaires] = useState([]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:1337/api/users/me', {
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
      const response = await axios.get('http://localhost:1337/api/post-frenzs?populate=image', {
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
  console.log('posts', posts);
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
    <div className="flex gap-6 max-w-7xl mx-auto px-4 py-8">
      <LeftSideBar />

      <div className='h-screen flex flex-col items-center w-full'>
        <div className='w-3/4'>
          {posts.length > 0 ? (
            [...posts].reverse().map((post) => (
              <div key={post.id} className='border p-4 mb-4 shadow'>
                <h2 className='text-xl font-semibold'>{post.title || post.title_frenz}</h2>
                <p>{post.description || post.content}</p>

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
                  <p className="text-gray-500">Aucune image disponible pour ce post.</p>
                )}

                <div className='mt-4'>
                  <h3 className='text-lg font-bold'>Commentaires :</h3>
                  {commentaires
                    .filter((commentaire) => commentaire.post_frenz && commentaire.post_frenz.id === post.id)
                    .map((commentaire) => (
                      <p key={commentaire.id} className='text-gray-700'>
                        {commentaire.commentaire}
                      </p>
                    ))}
                  {commentaires.filter((commentaire) => commentaire.post_frenz && commentaire.post_frenz.id === post.id).length === 0 && (
                    <p className='text-gray-500'>Aucun commentaire sur ce post.</p>
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
}

export default Homepage;