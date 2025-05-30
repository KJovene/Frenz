import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
function EditProfile() {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState(null); 
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState(''); 
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/users/${id}`, {
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
      const imageUploadResponse = await axios.post(`${API_URL}/upload`, formData, {
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
      return uploadedImage.id; 
    } catch (err) {
      console.error('Erreur lors du téléchargement de l\'image :', err);
      throw err;
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      setError('');

      let imageId = profileImage;

      if (image) {
        imageId = await handleImageUpload(); 
      }

      const postData = { 
        username,
        ...(imageId && { image: imageId }),
        promo,
      }

      const token = localStorage.getItem('token');

      await axios.put(
        `${API_URL}/users/${id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/profile'); 
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
        `${API_URL}/auth/change-password`,
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
    <div className="max-w-3xl mx-auto p-6 bg-[#27272a] rounded-lg shadow-md text-white mt-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Modifier le Profil</h1>

      {error && <p className="text-red-500 text-center mb-4 bg-[#3f3f46] p-3 rounded-lg">{error}</p>}

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#a1a1aa] mb-2">Nom d'utilisateur</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-[#3f3f46] bg-[#18181b] rounded-lg focus:outline-none focus:border-[#CCDF5E] focus:ring-1 focus:ring-[#9333ea]"
        />
      </div>

      <select name="promo" id="promo"
        value={promo}
        onChange={(e) => setPromo(e.target.value)}
        className="w-full px-4 py-3 border border-[#3f3f46] bg-[#18181b] rounded-lg focus:outline-none focus:border-[#CCDF5E] focus:ring-1 focus:ring-[#9333ea]">
        <option value="" disabled>Choisir une promo</option>
        <option value="Web1">Web 1</option>
        <option value="Data1">Data 1</option>
        <option value="Web2">Web 2</option>
        <option value="Data2">Data 2</option>
        <option value="Web3">Web 3</option>
        <option value="Data3">Data 3</option>
      </select>

      <div className="mb-8">
        <label className="block text-sm font-medium text-[#a1a1aa] mb-2">Photo de profil</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full px-4 py-3 border border-[#3f3f46] bg-[#18181b] rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-white file:bg-[#9333ea] hover:file:bg-[#6b21a8] file:transition-colors"
        />
      </div>

      <div className="mb-8 p-5 bg-[#27272a] border border-[#3f3f46] rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Changer le mot de passe</h2>
        <input
          type="password"
          placeholder="Mot de passe actuel"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-3 border border-[#3f3f46] bg-[#18181b] rounded-lg mb-3 focus:outline-none focus:border-[#CCDF5E] focus:ring-1 focus:ring-[#9333ea]"
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 border border-[#3f3f46] bg-[#18181b] rounded-lg mb-3 focus:outline-none focus:border-[#CCDF5E] focus:ring-1 focus:ring-[#9333ea]"
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 border border-[#3f3f46] bg-[#18181b] rounded-lg mb-4 focus:outline-none focus:border-[#CCDF5E] focus:ring-1 focus:ring-[#9333ea]"
        />
        <button
          onClick={handlePasswordChange}
          className="bg-[#9333ea] hover:bg-[#6b21a8] transition-colors py-3 px-6 rounded-full text-white"
        >
          Modifier le mot de passe
        </button>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleSaveChanges}
          className="flex-1 bg-[#9333ea] hover:bg-[#6b21a8] transition-colors py-3 px-6 rounded-full text-white font-medium"
          disabled={loading}
        >
          {loading ? 'Enregistrement...' : 'Sauvegarder les modifications'}
        </button>
        <Link to="/profile" className="flex-1">
          <button className="w-full bg-[#9333ea] hover:bg-[#a1a1aa] transition-colors py-3 px-6 rounded-full text-white">
            Annuler
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EditProfile;