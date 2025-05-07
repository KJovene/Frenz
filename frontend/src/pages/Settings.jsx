import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Settings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [preferences, setPreferences] = useState({
    darkMode: true,
    emailNotifications: true,
    pushNotifications: true,
    language: 'français',
    privateAccount: false,
    showActivity: true,
    allowTagging: true,
    allowDirectMessages: true
  });

  useEffect(() => {
    fetchUserPreferences();
  }, []);

  const fetchUserPreferences = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      setIsLoading(true);
      
      // Dans une implémentation réelle, vous feriez un appel API pour récupérer les préférences
      // Simuler un chargement des préférences
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
    } catch (err) {
      setIsLoading(false);
      setNotification({ 
        message: "Erreur lors de la récupération des préférences", 
        type: 'error' 
      });
      console.error('Erreur:', err);
    }
  };

  const handleToggleChange = (name) => {
    setPreferences({ ...preferences, [name]: !preferences[name] });
  };

  const handleLanguageChange = (e) => {
    setPreferences({ ...preferences, language: e.target.value });
  };

  const updatePreferences = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      // Dans une implémentation réelle, vous feriez un appel API pour mettre à jour les préférences
      // Simuler une mise à jour réussie
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
      console.error('Erreur:', err);
    }
  };

  const deleteAccount = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        // Suppression du compte
        await axios.delete('http://localhost:1337/api/users/me', {
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
        <h1 className="text-3xl font-bold mb-8 text-white">Paramètres</h1>
        
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
          {/* Section préférences d'affichage */}
          <div className="bg-[#27272a] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Préférences d'affichage</h2>
            <form className="space-y-4">
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
              
              <div>
                <label className="block text-[#a1a1aa] mb-2">Langue</label>
                <select
                  value={preferences.language}
                  onChange={handleLanguageChange}
                  className="w-full p-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CCDF5E]"
                >
                  <option value="français">Français</option>
                  <option value="english">English</option>
                  <option value="español">Español</option>
                  <option value="español">Deutsch</option>
                  <option value="español">中文</option>
                  <option value="español">日本語</option>
                  <option value="español">한국어</option>
                </select>
              </div>
            </form>
          </div>
          
          {/* Section notifications */}
          <div className="bg-[#27272a] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Notifications</h2>
            <form className="space-y-4">
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
              
              <div className="flex items-center justify-between">
                <span className="text-[#a1a1aa]">Notifications push</span>
                <button
                  type="button"
                  onClick={() => handleToggleChange('pushNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    preferences.pushNotifications ? 'bg-[#CCDF5E]' : 'bg-[#3f3f46]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="mt-4 text-[#a1a1aa]">
                <p className="mb-2">Recevoir des notifications pour:</p>
                <div className="space-y-2 ml-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="likes" className="mr-2" defaultChecked />
                    <label htmlFor="likes">J'aime</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="comments" className="mr-2" defaultChecked />
                    <label htmlFor="comments">Commentaires</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="follows" className="mr-2" defaultChecked />
                    <label htmlFor="follows">Nouveaux abonnés</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="direct_messages" className="mr-2" defaultChecked />
                    <label htmlFor="direct_messages">Messages directs</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Section confidentialité */}
          <div className="bg-[#27272a] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Confidentialité</h2>
            <form className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#a1a1aa]">Compte privé</span>
                <button
                  type="button"
                  onClick={() => handleToggleChange('privateAccount')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    preferences.privateAccount ? 'bg-[#CCDF5E]' : 'bg-[#3f3f46]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      preferences.privateAccount ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[#a1a1aa]">Afficher mon activité</span>
                <button
                  type="button"
                  onClick={() => handleToggleChange('showActivity')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    preferences.showActivity ? 'bg-[#CCDF5E]' : 'bg-[#3f3f46]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      preferences.showActivity ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[#a1a1aa]">Autoriser les mentions</span>
                <button
                  type="button"
                  onClick={() => handleToggleChange('allowTagging')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    preferences.allowTagging ? 'bg-[#CCDF5E]' : 'bg-[#3f3f46]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      preferences.allowTagging ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[#a1a1aa]">Autoriser les messages directs</span>
                <button
                  type="button"
                  onClick={() => handleToggleChange('allowDirectMessages')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    preferences.allowDirectMessages ? 'bg-[#CCDF5E]' : 'bg-[#3f3f46]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      preferences.allowDirectMessages ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </form>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={updatePreferences}
              className="bg-[#9333ea] hover:bg-[#6b21a8] transition-colors py-3 px-6 rounded-full text-white"
            >
              Enregistrer toutes les préférences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;