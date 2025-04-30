import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Récupérer le terme de recherche depuis l'URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        // TODO: Remplacer par votre véritable endpoint de recherche Strapi
        const response = await axios.get(`/api/search?query=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Erreur de recherche:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Résultats de recherche pour "{query}"
      </h1>

      {results.length === 0 ? (
        <div className="text-center text-gray-600">
          Aucun résultat trouvé
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <div 
              key={result.id} 
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
              <p className="text-gray-600 line-clamp-3">{result.content}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Dans : {result.subreddit || 'Non classé'}
                </span>
                <a 
                  href={`/post/${result.id}`} 
                  className="text-orange-500 hover:underline"
                >
                  Voir plus
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;