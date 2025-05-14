import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { SketchPicker } from 'react-color';
import { API_URL } from '../config';
const AddPost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("")
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thematique, setThematiques] = useState('');
  const [customThematique, setCustomThematique] = useState('');
  const [customColor, setCustomColor] = useState('#ffffff');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [selectOptions, setSelectOptions] = useState([
    "Général",
    "Game",
    "Sport",
    "Culture",
    "Technologie",
    "Sante",
    "Environnement",
    "Éducation",
    "autre",
  ]);

  const thematiqueColors = {
    Général: '#1E90FF',
    Game: '#32CD32',
    Sport: '#FF4500',
    Culture: '#8A2BE2',
    Technologie: '#FFD700',
    Sante: '#FF69B4',
    Environnement: '#20B2AA',
    Education: '#FFA500',
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/post-frenzs?populate=*`);
        setPosts(response.data.data);
      } catch (error) {
        console.log("Erreur lors de la récupération des posts :", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchThematique = async (query) => {
    setQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);

    const validPosts = posts.filter((post) => post.thematique);
    const fuse = new Fuse(validPosts, {
      keys: ['thematique'],
      threshold: 0.3,
    });
    const results = fuse.search(query);

    const uniqueResults = Array.from(
      new Set(results.map((result) => result.item.thematique))
    ).map((thematique) => {
      return results.find((result) => result.item.thematique === thematique).item;
    });

    setSearchResults(uniqueResults);
    setIsLoading(false);
  };

  const highlightMatch = (text, query) => {
    if (!text) return ""
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, (match) => `<span class="bg-yellow-200">${match}</span>`);
  };

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

        const imageUploadResponse = await axios.post(`${API_URL}/upload`, formData, {
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
          `${API_URL}/post-frenzs?filters[thematique][$eq]=${customThematique}`,
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
          color: thematique !== 'Général' && thematique !== "Game" && thematique !== "Sport" && thematique !== "Culture" && thematique !== "Technologie" && thematique !== "Sante" && thematique !== "Environnement" && thematique !== "Éducation" ? customColor : thematiqueColors[thematique],
        },
      };

      const postResponse = await axios.post(`${API_URL}/post-frenzs`, postData, {
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

  const handleSelectThematique = (selectedThematique, selectedColor) => {
  setThematiques(selectedThematique); 
  setCustomThematique(''); 
  setCustomColor(selectedColor || thematiqueColors[selectedThematique] || '#ffffff'); 
  setQuery(selectedThematique); 
  setSearchResults([]); 
}
  
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

          <div className='flex items-center justify-between mb-4'>
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
              {selectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}

            </select>
            {!showSearch ? (
              <button className="btn btn-ghost btn-circle" onClick={() => setShowSearch(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="input input-bordered w-32 md:w-auto"
                  value={query}
                  onChange={(e) => handleSearchThematique(e.target.value)}
                  autoFocus
                />
                {query && searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50 max-h-48 overflow-y-auto">
                    <ul>
                      {searchResults.map((post) => (
                        <li
                          key={post.id}
                          className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectThematique(post.thematique,post.color)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <p
                            className="font-semibold text-blue-600 hover:underline"
                            dangerouslySetInnerHTML={{ __html: highlightMatch(post.thematique, query) }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

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
  )
}

export default AddPost;