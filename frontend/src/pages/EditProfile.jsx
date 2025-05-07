import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProfile() {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState(null); // Pour gérer l'image sélectionnée
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Récupérer l'ID utilisateur depuis l'URL

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:1337/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(response.data.username);
        setProfileImage(response.data.profileImage);
      } catch (err) {
        console.error('Erreur lors de la récupération des informations utilisateur :', err);
      }
    };

    fetchUser();
  }, [id]);

  const handleImageUpload = async () => {
    if (!image) {
      console.error('Aucune image sélectionnée.');
      return null;
    }

    try {
      const formData = new FormData();
      formData.append('files', image);

      const token = localStorage.getItem('token');
      const imageUploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const uploadedImage = imageUploadResponse.data[0];
      if (!uploadedImage || !uploadedImage.id) {
        throw new Error('Erreur lors de l\'upload de l\'image : aucune image retournée.');
      }

      console.log('Image téléchargée avec succès :', uploadedImage);
      return uploadedImage.id; // Retourne l'ID de l'image téléchargée
    } catch (err) {
      console.error('Erreur lors du téléchargement de l\'image :', err);
      throw err;
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      setError('');

      let imageId = profileImage; // Conserver l'image actuelle si aucune nouvelle image n'est téléchargée

      if (image) {
        imageId = await handleImageUpload(); // Télécharger l'image et récupérer son ID
      }

      const token = localStorage.getItem('token');

      // Mettre à jour les informations utilisateur avec l'image associée
      await axios.put(
        `http://localhost:1337/api/users/${id}`,
        { username, image: imageId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/profile'); // Rediriger vers la page de profil après la sauvegarde
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil :', err);
      setError('Erreur lors de la mise à jour du profil.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:1337/api/auth/change-password',
        {
          currentPassword,
          password: newPassword,
          passwordConfirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      alert('Mot de passe mis à jour avec succès.');
    } catch (err) {
      console.error('Erreur lors de la mise à jour du mot de passe :', err);
      setError('Erreur lors de la mise à jour du mot de passe.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Modifier le Profil</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Photo de profil</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Changer le mot de passe</label>
        <input
          type="password"
          placeholder="Mot de passe actuel"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <button
          onClick={handlePasswordChange}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Modifier le mot de passe
        </button>
      </div>

      <button
        onClick={handleSaveChanges}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        disabled={loading}
      >
        {loading ? 'Enregistrement...' : 'Sauvegarder les modifications'}
      </button>
      <Link to="/profile" className="mt-4 inline-block text-center">
        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg">Annuler</button>
      </Link>
    </div>
  );
}

export default EditProfile;