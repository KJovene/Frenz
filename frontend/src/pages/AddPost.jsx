import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let base64Image = null;

      if (image) {
        base64Image = await convertToBase64(image);
      }

      const postData = {
        data: {
          title,
          description,
          image: base64Image,
        },
      };

      const token = localStorage.getItem('token');
      navigate('/')
      const response = await axios.post('http://localhost:1337/api/post-frenzs', postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });

      setTitle('');
      setDescription('');
      setImage(null);

      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la création du post :', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xl px-6 py-8 bg-[#272626] rounded-3xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Créer un nouveau post</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black text-white border-none focus:outline-none focus:ring-2 focus:ring-[#CCDF5E]"
            />
          </div>
          
          <div>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black text-white border-none focus:outline-none focus:ring-2 focus:ring-[#CCDF5E] h-32"
            />
          </div>
          
          <div className="bg-black rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer relative">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <svg className="w-8 h-8 mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="text-sm text-white">Ajouter une image</p>
            <p className="text-xs text-gray-400">JPG, PNG</p>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#CCDF5E] text-black py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition duration-300"
          >
            Publier
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;