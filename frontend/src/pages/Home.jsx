import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirigez si aucun token n'est trouvé
        return;
      }
  
      const response = await axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log('Utilisateur connecté :', response.data); // Affichez les données de l'utilisateur
      } else {
        navigate('/login'); // Redirigez si le statut n'est pas 200
      }
    } catch (err) {
      navigate('/login'); // Redirigez en cas d'erreur
      console.error('Erreur lors de la récupération de l\'utilisateur :', err);
    }
  };
  

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='text-3xl text-blue-500'>
      Home
    </div>
  )
}

export default Home