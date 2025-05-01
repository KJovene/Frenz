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
      navigate('/')
      const response = await axios.post('http://localhost:1337/api/post-frenzs', postData, {
        headers: {
          'Content-Type': 'application/json',
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
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center shadow-lg px-8 py-5 border w-96 gap-3'>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Créer le post</button>
      </form>
    </div>
  );
};

export default AddPost;