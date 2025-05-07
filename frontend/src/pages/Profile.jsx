// pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null); // Données utilisateur à récupérer
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const navigate = useNavigate();

  // Effet de récupération du profil utilisateur
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Récupère le token depuis localStorage

      if (!token) {
        // Si aucun token n'est trouvé, on redirige l'utilisateur vers la page de connexion
        navigate('/login');
        return;
      }

      try {
        // Envoi de la requête pour récupérer les données utilisateur
        const response = await axios.get('http://localhost:1337/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // On met à jour les données utilisateur
        setUser(response.data);
      } catch (err) {
        // En cas d'erreur, on log l'erreur et on redirige vers la page de connexion
        console.error('Erreur lors de la récupération du profil:', err);
        setError('Une erreur est survenue lors de la récupération de vos données. Veuillez réessayer.');
        navigate('/login');
      } finally {
        // On arrête le chargement une fois que tout est fini
        setLoading(false);
      }
    };

    fetchProfile(); // Appel de la fonction pour récupérer le profil
  }, [navigate]);

  // Si l'on est encore en train de charger les données ou qu'il y a une erreur
  if (loading) {
    return <div className="text-center mt-10">Chargement du profil...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  // Si aucune donnée utilisateur n'a été récupérée
  if (!user) {
    return <div className="text-center mt-10">Aucun profil trouvé.</div>;
  }

  // Affichage du profil utilisateur une fois toutes les données récupérées
  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Mon Profil</h1>

      {/* Affichage du pseudo */}
      <div className="mb-2">
        <p><span className="font-semibold">Pseudo :</span> {user.username}</p>
      </div>

      {/* Affichage de l'email */}
      <div className="mb-2">
        <p><span className="font-semibold">Email :</span> {user.email}</p>
      </div>

      {/* Si des informations supplémentaires sont disponibles (comme une bio), on peut les afficher */}
      {user.bio && (
        <div className="mb-2">
          <p><span className="font-semibold">Bio :</span> {user.bio}</p>
        </div>
      )}

      {/* Si une photo de profil est disponible */}
      {user.profilePicture && (
        <div className="mb-2">
          <img 
            src={user.profilePicture.url} 
            alt="Photo de profil" 
            className="w-24 h-24 rounded-full mx-auto" 
          />
        </div>
      )}

      {/* TODO: Ajouter la possibilité de modifier le profil dans le futur */}
    </div>
  );
}

export default Profile;
