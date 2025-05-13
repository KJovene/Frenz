import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thematique, setThematiques] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/post-frenzs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const post = response.data.data;
        setTitle(post.title || '');
        setDescription(post.description || '');
        setThematiques(post.thematique || '');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du post :', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      console.error('Le titre est manquant.');
      return;
    }

    try {
      setLoading(true);

      const postData = {
        data: {
          title,
          description,
          thematique,
        },
      };

      await axios.put(`${API_URL}/post-frenzs/${id}`, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du post :', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

   if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#18181b]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9333ea]"></div>
      </div>
    );
  }
 return (
  <div className="flex justify-center items-center min-h-screen bg-[#18181b]">
    <div className="w-full max-w-xl px-6 py-8 bg-[#27272a] rounded-3xl">
      <h2 className="text-2xl font-bold text-[#ffffff] mb-6 text-center">Editez votre post</h2>

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

        <select
          name="thematique"
          id="thematique"
          onChange={(e) => setThematiques(e.target.value)}
          value={thematique}
          required
          className="w-full px-4 py-3 rounded-lg bg-[#18181b] text-[#ffffff] border-none focus:outline-none focus:ring-2 focus:ring-[#9333ea]"
        >
          <option value="" disabled>
            Choisir une thématique
          </option>
          <option value="général">Général</option>
          <option value="game">Jeux vidéos</option>
          <option value="sport">Sport</option>
          <option value="culture">Culture</option>
          <option value="technologie">Technologie</option>
          <option value="sante">Santé</option>
          <option value="environnement">Environnement</option>
          <option value="education">Éducation</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[#6b21a8] text-[#ffffff] py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Edition...' : 'Editer'}
        </button>
      </form>
    </div>
  </div>
)
}

export default EditPost;