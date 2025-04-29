import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../assets/LogoutButton.jsx'

function Home() {
  const navigate = useNavigate()
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
  

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='h-screen flex justify-center items-center w-full'>
      <button type='submit'><LogoutButton /></button>
    </div>
  )
}

export default Home