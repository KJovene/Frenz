import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import LogoutButton from '../assets/LogoutButton.jsx'

function Home() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
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


  useEffect(() => {
    fetchUser();
    fetchPost();
  }, [])

  return (
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
              <h2 className='text-xl font-semibold'>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          ))
        ) : (
          <p>Aucun post disponible.</p>
        )}
      </div>
    </div>
  )
}

export default Home

