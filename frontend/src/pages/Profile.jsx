// pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// TODO: Plus tard, ajouter Liveblocks pour voir qui consulte cette page
// import { RoomProvider, useOthers } from "@liveblocks/react";

function Profile() {
  const [user, setUser] = useState(null); // Stocke les données de l'utilisateur
  const navigate = useNavigate();

  // Vérifie que l'utilisateur est connecté et récupère ses infos depuis Strapi
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirige vers la page login si non connecté
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:1337/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
        navigate('/login'); // Redirection de sécurité
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div className="text-center mt-10">Chargement du profil...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg border rounded-lg bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Mon Profil</h1>

      <div className="space-y-3 text-gray-800">
        <p><span className="font-semibold">👤 Pseudo :</span> {user.username}</p>
        <p><span className="font-semibold">📧 Email :</span> {user.email}</p>

        {/* TODO: Une fois les champs créés dans Strapi, les afficher ici */}
        <p><span className="font-semibold">📅 Date d'inscription :</span> {/* user.createdAt */} à venir</p>
        <p><span className="font-semibold">📝 Bio :</span> {/* user.bio */} à compléter</p>

        {/* TODO: Ajouter un bouton pour modifier les infos (future feature) */}
      </div>

      {/* TODO: Ajouter Liveblocks + Avatar des autres utilisateurs en ligne ici */}

      {/* Bouton pour revenir à l'accueil ou se déconnecter */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Accueil
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default Profile;
