import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
const Settings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    darkMode: true,
    emailNotifications: true,
    language: 'français'
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      setIsLoading(true);
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData({
        ...userData,
        username: response.data.username,
        email: response.data.email,
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setNotification({ 
        message: "Erreur lors de la récupération des données utilisateur", 
        type: 'error' 
      });
      console.error('Erreur lors de la récupération de l\'utilisateur :', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleToggleChange = (name) => {
    setPreferences({ ...preferences, [name]: !preferences[name] });
  };

  const handleLanguageChange = (e) => {
    setPreferences({ ...preferences, language: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.put(`${API_URL}/users/me`, {
        username: userData.username,
        email: userData.email
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setNotification({ message: 'Profil mis à jour avec succès!', type: 'success' });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setNotification({ 
        message: "Erreur lors de la mise à jour du profil", 
        type: 'error' 
      });
      console.error('Erreur lors de la mise à jour du profil :', err);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    
    if (userData.newPassword !== userData.confirmPassword) {
      setNotification({ 
        message: "Les mots de passe ne correspondent pas", 
        type: 'error' 
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.post(`${API_URL}/auth/change-password`, {
        currentPassword: userData.currentPassword,
        password: userData.newPassword,
        passwordConfirmation: userData.confirmPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setUserData({
        ...userData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setNotification({ message: 'Mot de passe mis à jour avec succès!', type: 'success' });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setNotification({ 
        message: "Erreur lors de la mise à jour du mot de passe", 
        type: 'error' 
      });
      console.error('Erreur lors de la mise à jour du mot de passe :', err);
    }
  };

  const updatePreferences = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        setNotification({ message: 'Préférences mises à jour avec succès!', type: 'success' });
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setNotification({ 
        message: "Erreur lors de la mise à jour des préférences", 
        type: 'error' 
      });
      console.error('Erreur lors de la mise à jour des préférences :', err);
    }
  };

  const deleteAccount = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        await axios.delete(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        localStorage.removeItem('token');
        navigate('/login');
      } catch (err) {
        setIsLoading(false);
        setNotification({ 
          message: "Erreur lors de la suppression du compte", 
          type: 'error' 
        });
        console.error('Erreur lors de la suppression du compte :', err);
      }
    }
  };

  return (
    <div className="flex-1 p-6 bg-[#18181b] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Paramètres du compte</h1>
        
        {notification.message && (
          <div className={`p-4 mb-6 rounded-lg ${
            notification.type === 'success' ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'
          }`}>
            {notification.message}
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#c084fc]"></div>
          </div>
        )}
        
        <div className="grid gap-8">

          {/* Profil */}
          <div className="bg-[#27272a] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Profil</h2>
            <form onSubmit={updateProfile} className="space-y-4">
              <div>
                <label className="block text-[#a1a1aa] mb-2">Nom d'utilisateur</label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CCDF5E]"
                />
              </div>
              
              <div>
                <label className="block text-[#a1a1aa] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CCDF5E]"
                />
              </div>
              
              <button
                type="submit"
                className="mt-4 bg-[#9333ea] hover:bg-[#6b21a8] transition-colors py-2 px-4 rounded-full text-white"
              >
                Mettre à jour le profil
              </button>
            </form>
          </div>
          
          {/* Mdp*/}
          <div className="bg-[#27272a] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Changer le mot de passe</h2>
            <form onSubmit={updatePassword} className="space-y-4">
              <div>
                <label className="block text-[#a1a1aa] mb-2">Mot de passe actuel</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={userData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CCDF5E]"
                />
              </div>
              
              <div>
                <label className="block text-[#a1a1aa] mb-2">Nouveau mot de passe</label>
                <input
                  type="password"
                  name="newPassword"
                  value={userData.newPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CCDF5E]"
                />
              </div>
              
              <div>
                <label className="block text-[#a1a1aa] mb-2">Confirmer le nouveau mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CCDF5E]"
                />
              </div>
              
              <button
                type="submit"
                className="mt-4 bg-[#9333ea] hover:bg-[#6b21a8] transition-colors py-2 px-4 rounded-full text-white"
              >
                Mettre à jour le mot de passe
              </button>
            </form>
          </div>
          
          {/* préférences */}
          <div className="bg-[#27272a] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Préférences</h2>
            <form onSubmit={updatePreferences} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#a1a1aa]">Mode sombre</span>
                <button
                  type="button"
                  onClick={() => handleToggleChange('darkMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    preferences.darkMode ? 'bg-[#CCDF5E]' : 'bg-[#3f3f46]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[#a1a1aa]">Notifications par email</span>
                <button
                  type="button"
                  onClick={() => handleToggleChange('emailNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    preferences.emailNotifications ? 'bg-[#CCDF5E]' : 'bg-[#3f3f46]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div>
                <label className="block text-[#a1a1aa] mb-2">Langue</label>
                <select
                  value={preferences.language}
                  onChange={handleLanguageChange}
                  className="w-full p-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CCDF5E]"
                >
                  <option value="français">Français</option>
                  <option value="english">English</option>
                  <option value="español">Chinese</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="mt-4 bg-[#9333ea] hover:bg-[#6b21a8] transition-colors py-2 px-4 rounded-full text-white"
              >
                Enregistrer les préférences
              </button>
            </form>
          </div>
          
          {/* Suppression de compte */}
          <div className="bg-[#27272a] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Supprimer le compte</h2>
            <p className="text-[#a1a1aa] mb-4">
              Cette action est irréversible. Toutes vos données seront définitivement supprimées.
            </p>
            <button
              onClick={deleteAccount}
              className="bg-red-600 hover:bg-red-700 transition-colors py-2 px-4 rounded-full text-white"
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;