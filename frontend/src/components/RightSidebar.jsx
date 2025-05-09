import React, { useEffect, useState } from 'react';
import { TrendingUp, ChevronRight, PlusCircle } from 'lucide-react';

const RightSideBar = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const fetchTrendingTopics = async () => {
    try {
      const response = await fetch('https://rss.app/feeds/v1.1/tO0XAXevvzTShx7z.json');
      const data = await response.json();
      const trends = data.items.map((item) => ({
        title: item.title,
        link: item.url,
        category: item.categories ? item.categories[0] : 'Tech',
        pubDate: item.date_published,
      }));
      setTrendingTopics(trends);
    } catch (error) {
      console.error('Erreur lors de la récupération des tendances :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const handleShowLess = () => {
    setVisibleCount((prevCount) => Math.max(prevCount - 3, 3)); 
  };

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  return (
    <aside className="hidden lg:block w-[568px] space-y-6 sticky top-20 self-start">
      <a
        href="/addpost"
        className="bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl block text-center shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium"
      >
        <PlusCircle size={18} />
        <span>Créer un post</span>
      </a>
      <div className="bg-[#1f1f23] p-6 rounded-2xl shadow-2xl border border-base-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-purple-500" />
            <span>Tendances Tech</span>
          </h2>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Chargement des tendances...</p>
        ) : (
          <div className="space-y-6">
            {trendingTopics.slice(0, visibleCount).map((item, idx) => (
              <div
                key={idx}
                className="bg-base-100 rounded-xl border border-base-300 p-4 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-white text-sm leading-snug group-hover:text-gray-200 transition-colors line-clamp-2">
                    {item.title}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{new Date(item.pubDate).toLocaleDateString('fr-FR')}</span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors flex items-center cursor-pointer"
                    >
                      Lire plus
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-4">
              {visibleCount < trendingTopics.length && (
                <button
                  onClick={handleShowMore}
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold"
                >
                  Afficher plus de tendances
                </button>
              )}
              {visibleCount > 3 && (
                <button
                  onClick={handleShowLess}
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold"
                >
                  Afficher moins de tendances
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="bg-[#1f1f23] p-6 rounded-2xl shadow-2xl border border-base-300">
        <h3 className="text-white font-semibold mb-3">Restez informé</h3>
        <p className="text-gray-400 text-sm mb-4">
          Inscrivez-vous pour recevoir les dernières tendances directement dans votre boîte de réception.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 input input-bordered input-sm bg-base-100 text-white border-base-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          <button className="btn btn-sm bg-purple-600 hover:bg-purple-700 border-none text-white">
            S'inscrire
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;