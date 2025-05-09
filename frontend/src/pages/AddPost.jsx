import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SketchPicker } from 'react-color';

const AddPost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thematique, setThematiques] = useState('');
  const [customThematique, setCustomThematique] = useState('');
  const [customColor, setCustomColor] = useState('#ffffff');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Un titre est requis pour le post.');
      return;
    }

    try {
      setLoading(true);
      setError('');

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

      if (thematique === 'autre') {
        const existingThematiqueResponse = await axios.get(
          `http://localhost:1337/api/post-frenzs?filters[thematique][$eq]=${customThematique}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (existingThematiqueResponse.data.data.length > 0) {
          setError('Cette thématique existe déjà, veuillez en créer une autre.');
          setLoading(false);
          return;
        }
      }

      const postData = {
        data: {
          title,
          description,
          image: imageId,
          thematique: thematique === 'autre' ? customThematique : thematique,
          customThematique,
          color: thematique === 'autre' ? customColor : null,
        },
      };

      const postResponse = await axios.post('http://localhost:1337/api/post-frenzs', postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setThematiques('');
      setCustomColor('#ffffff');
      setTitle('');
      setDescription('');
      setImage(null);

      if (onPostCreated) {
        onPostCreated(postResponse.data);
      }
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Erreur lors de la création du post.');
      } else {
        console.error('Erreur lors de la création du post :', error.response?.data || error.message);
      }
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
            <svg
              className="w-8 h-8 mb-2 text-[#c084fc]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <p className="text-sm text-[#ffffff]">Ajouter une image</p>
            <p className="text-xs text-[#a1a1aa]">JPG, PNG</p>
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
            <option value="Général">Général</option>
            <option value="Game">Jeux vidéos</option>
            <option value="Sport">Sport</option>
            <option value="Culture">Culture</option>
            <option value="Technologie">Technologie</option>
            <option value="Sante">Santé</option>
            <option value="Environnement">Environnement</option>
            <option value="Education">Éducation</option>
            <option value="autre">Autre</option>
          </select>

          {thematique === 'autre' && (
            <div>
              <input
                type="text"
                placeholder="Entrez votre thématique"
                value={customThematique}
                onChange={(e) => setCustomThematique(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#18181b] text-[#ffffff] border-none focus:outline-none focus:ring-2 focus:ring-[#9333ea]"
              />
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="flex flex-col mt-4 w-full justify-center items-center">
                <p className="text-sm text-[#ffffff] mb-2">Choisissez une couleur :</p>
                <SketchPicker
                  color={customColor}
                  onChangeComplete={(color) => setCustomColor(color.hex)}
                />
              </div>
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