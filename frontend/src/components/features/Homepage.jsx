import React, { useState, useEffect } from 'react';
import LeftSideBar from '../../components/LeftSideBar';
import RightSideBar from '../../components/RightSidebar'; 
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import LogoutButton from '../../components/LogoutButton.jsx';
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

      if (response.status === 200) {
        console.log('Utilisateur connecté :', response.data);
      } else {
        navigate('/login');
      }
    } catch (err) {
      navigate('/login');
      console.error('Erreur lors de la récupération de l\'utilisateur :', err);
    }
  };

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:1337/api/post-frenzs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setPosts(response.data.data); // Stockez les posts dans l'état
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
        setCommentaires(response.data.data); // Stockez les commentaires dans l'état
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


  return (
    <div className="flex gap-6 max-w-7xl mx-auto px-4 py-8">
      {/* Left Sidebar */}
      <LeftSideBar />

      <div className='h-screen flex flex-col items-center w-full'>
      <button type='submit' className='mb-4'>
        <LogoutButton />
      </button>
      <Link to="/addpost" className='bg-blue-500 text-white px-4 py-2'>Créer un post</Link>
      <h1 className='text-2xl font-bold mb-4'>Liste des Posts</h1>
      <div className='w-3/4'>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className='border p-4 mb-4 shadow'>
              <h2 className='text-xl font-semibold'>{post.title || post.title_frenz}</h2>
              <p>{post.description || post.content}</p>
  
              <div className='mt-4'>
                <h3 className='text-lg font-bold'>Commentaires :</h3>
                {commentaires
                  .filter((commentaire) => commentaire.post_frenz.id === post.id)
                  .map((commentaire) => (
                    <p key={commentaire.id} className='text-gray-700'>
                      {commentaire.commentaire}
                    </p>
                  ))}
                {commentaires.filter((commentaire) => commentaire.post_frenz.id === post.id).length === 0 && (
                  <p className='text-gray-500'>Aucun commentaire sur ce post.</p>
                )}
              </div>
  
              <Comments id={post.documentId} />
            </div>
          ))
        ) : (
          <p>Aucun post disponible.</p>
        )}
      </div>
    </div>
  
      {/* Right Sidebar */}
      <RightSideBar />
    </div>
  );
}

export default Homepage;
