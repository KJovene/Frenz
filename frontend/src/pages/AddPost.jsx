import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thematique, setThematiques] = useState('');
  const [customThematique, setCustomThematique] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      console.error('Un titre est requis pour le post.');
      return;
    }
  
    try {
      setLoading(true);
  
      let imageId = null;
  
      if (image) {
        const formData = new FormData();
        formData.append('files', image);
  
        const imageUploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        const uploadedImage = imageUploadResponse.data[0];
        imageId = uploadedImage?.id;
      }
  
      const postData = {
        data: {
          title,
          description,
          image: imageId, 
          thematique: thematique === 'autre' ? customThematique : thematique, 
        },
      };
  
      const postResponse = await axios.post('http://localhost:1337/api/post-frenzs', postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      setThematiques('');
      setTitle('');
      setDescription('');
      setImage(null);
  
      if (onPostCreated) {
        onPostCreated(postResponse.data);
      }
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création du post :', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#18181b]">
      <div className="w-full max-w-xl px-6 py-8 bg-[#27272a] rounded-3xl">
        <h2 className="text-2xl font-bold text-[#ffffff] mb-6 text-center">Créer un nouveau post</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#18181b] text-[#ffffff] border-none focus:outline-none focus:ring-2 focus:ring-[#9333ea]"
            />
          </div>
          
          <div>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#18181b] text-[#ffffff] border-none focus:outline-none focus:ring-2 focus:ring-[#9333ea] h-32"
            />
          </div>
          
          <div className="bg-[#18181b] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer relative">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <svg className="w-8 h-8 mb-2 text-[#c084fc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="text-sm text-[#ffffff]">Ajouter une image</p>
            <p className="text-xs text-[#a1a1aa]">JPG, PNG</p>
          </div>

          <select name="thematique" id="thematique" 
          onChange={(e) => setThematiques(e.target.value)}
          value={thematique} 
          required
          className="w-full px-4 py-3 rounded-lg bg-[#18181b] text-[#ffffff] border-none focus:outline-none focus:ring-2 focus:ring-[#9333ea]">
            <option value="" disabled selected>Choisir une thématique</option>
            <option value="général">Général</option>
            <option value="game">Jeux vidéos</option>
            <option value="sport">Sport</option>
            <option value="culture">Culture</option>
            <option value="technologie">Technologie</option>
            <option value="sante">Santé</option>
            <option value="environnement">Environnement</option>
            <option value="education">Éducation</option>
            <option value="autre">Autre</option>
          </select>

          {thematique === 'autre' && (
            <div>
              <input
                type="text"
                placeholder="Entrez votre thématique"
                value={customThematique}
                onChange={(e) => setThematiques(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#18181b] text-[#ffffff] border-none focus:outline-none focus:ring-2 focus:ring-[#9333ea]"
              />
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-[#6b21a8] text-[#ffffff] py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Publication...' : 'Publier'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;