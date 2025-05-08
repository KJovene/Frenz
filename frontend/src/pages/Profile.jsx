import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:1337/api/users/me?populate=*', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Utilisateur récupéré :', response.data);

      setUser(response.data);
      setLoading(false);
    } catch (err) {
      navigate('/login');
      console.error('Erreur lors de la récupération de l\'utilisateur :', err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Mon Profil</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col items-center mb-6">
        {/* Affichage de l'image de profil */}
        {user.image ? (
          <img
            src={`http://localhost:1337${user.image.url}`}
            alt={user.image.alternativeText || 'Photo de profil'}
            className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <span className="text-gray-500">Aucune image</span>
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="text-gray-600 font-medium">Email :</span>
          <span className="text-gray-800">{user.email}</span>
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="text-gray-600 font-medium">Date de création :</span>
          <span className="text-gray-800">
            {new Date(user.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>

      <Link to={`/editProfile/${user.id}`} className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
        Modifier le profil
      </Link>
    </div>
  );
}

export default Profile;