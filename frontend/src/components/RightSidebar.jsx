import React from 'react';
import { Search, TrendingUp } from 'lucide-react';
import trumpImage from '../assets/images/Trump.png';
import markImage from '../assets/images/mark.jpeg';
import environmentImage from '../assets/images/beyonce.avif';

const RightSideBar = () => {
  const trendingTopics = [
    {
      title: "Trump celebrates 100 days in office in front of his supporters, despite growing concern over the economy...",
      category: "Politics",
      trend: "+37%",
      image: trumpImage,
    },
    {
      title: "Mark Zuckerberg Announces the End of Mobile Phones and Reveals What Will Replace Them...",
      category: "Economy",
      trend: "+28%",
      image: markImage,
    },
    {
      title: "Review: Beyoncé’s Tampa concert was a fierce celebration of Black, queer love...",
      category: "Trending in the World",
      trend: "+19%",
      image: environmentImage,
    },
  ];

  const whoToFollow = [
    {
      name: "Google France",
      handle: "@google_france",
      avatar: "https://logo.clearbit.com/google.com",
      verified: true,
    },
    {
      name: "Meta",
      handle: "@Meta",
      avatar: "https://logo.clearbit.com/meta.com",
      verified: true,
    },
    {
      name: "Netflix USA",
      handle: "@netflix_usa",
      avatar: "https://logo.clearbit.com/netflix.com",
      verified: true,
    },
    {
      name: "Warren Buffett",
      handle: "@warrenbuffett",
      avatar: "https://logo.clearbit.com/berkshirehathaway.com",
      verified: true,
    },
  ];

  return (
    <aside className="hidden lg:block w-80 space-y-6 sticky top-20 self-start">
      {/* Search bar */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Tendances</h2>
          <TrendingUp size={18} className="text-purple-500" />
        </div>

        <div className="space-y-4">
          {trendingTopics.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-xl overflow-hidden shadow border border-gray-700 hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-36 object-cover object-center"
              />
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-green-500 text-sm font-medium">{item.trend}</span>
                </div>
                <p className="text-gray-200 text-sm leading-snug hover:text-white transition-colors">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="/trending"
          className="text-purple-500 hover:text-purple-400 text-sm block mt-4 text-center"
        >
          Voir plus de tendances
        </a>
      </div>

      {/* Who to follow */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-white">Suggestions</h2>
        <ul className="space-y-4">
          {whoToFollow.map((user, idx) => (
            <li key={idx} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {user.verified && (
                    <span className="absolute -right-1 -bottom-1 bg-purple-500 rounded-full p-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  <p className="text-white font-medium group-hover:text-purple-400 transition-colors">
                    {user.name}
                  </p>
                  <p className="text-gray-400 text-xs">{user.handle}</p>
                </div>
              </div>
              <button className="btn btn-sm bg-purple-600 hover:bg-purple-700 border-none text-white rounded-full px-4">
                Suivre
              </button>
            </li>
          ))}
        </ul>
        <a
          href="/suggestions"
          className="text-purple-500 hover:text-purple-400 text-sm block mt-4 text-center"
        >
          Voir plus de suggestions
        </a>
      </div>
    </aside>
  );
};

export default RightSideBar;
