import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();

  // Si aucun utilisateur n'est connecté, rediriger vers la page de login
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Nom d'utilisateur</label>
            <p className="text-gray-900">{user.username || 'Non spécifié'}</p>
          </div>
          
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <p className="text-gray-900">{user.email || 'Non spécifié'}</p>
          </div>
          
          {/* Exemple de statistiques ou d'informations supplémentaires */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Activité</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-gray-600">Posts</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-gray-600">Commentaires</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            className="btn btn-primary w-full"
            onClick={() => {
              // Logique de modification du profil
              alert('Fonctionnalité de modification non implémentée');
            }}
          >
            Modifier le profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;