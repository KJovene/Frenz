import React from 'react';
import { TrendingUp, PlusCircle, ChevronRight } from 'lucide-react';

const RightSideBar = () => {
  const trendingTopics = [
    {
      title: "Trump celebrates 100 days in office in front of his supporters, despite growing concern over the economy...",
      category: "Politics",
      trend: "+37%",
      timeAgo: "2 hours ago",
    },
    {
      title: "Mark Zuckerberg Announces the End of Mobile Phones and Reveals What Will Replace Them...",
      category: "Economy",
      trend: "+28%",
      timeAgo: "4 hours ago",
    },
    {
      title: "Review: Beyoncé's Tampa concert was a fierce celebration of Black, queen love...",
      category: "Trending in the World",
      trend: "+19%",
      timeAgo: "6 hours ago",
    },
  ];

  return (
    <aside className="hidden lg:block w-[568px] space-y-6 sticky top-20 self-start">
      {/* Create Post Button */}
      <a 
        href="/addpost" 
        className="bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl block text-center shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium"
      >
        <PlusCircle size={18} />
        <span>Créer un post</span>
      </a>

      {/* Trending Topics */}
      <div className="bg-[#1f1f23] p-6 rounded-2xl shadow-2xl border border-base-300">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-purple-500" />
            <span>Tendances</span>
          </h2>
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-xs btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {trendingTopics.map((item, idx) => (
            <div
              key={idx}
              className="bg-base-100 rounded-xl border border-base-300 p-4 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                    <TrendingUp size={14} />
                    {item.trend}
                  </span>
                </div>
                <p className="text-white text-sm leading-snug group-hover:text-gray-200 transition-colors line-clamp-2">
                  {item.title}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{item.timeAgo}</span>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center">
                    Read more
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-base-700">
          <a
            href="/trending"
            className="flex items-center justify-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors font-medium"
          >
            Voir plus de tendances
            <ChevronRight size={16} />
          </a>
        </div>
      </div>

      <div className="bg-[#1f1f23] p-6 rounded-2xl shadow-2xl border border-base-300">

        <h3 className="text-white font-semibold mb-3">Restez informé</h3>
        <p className="text-gray-400 text-sm mb-4">Inscrivez-vous pour recevoir les dernières tendances directement dans votre boîte de réception.</p>
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
