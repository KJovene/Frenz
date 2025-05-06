import React from 'react';
import { Users } from 'lucide-react';

const whoToFollow = [
  {
    name: 'Netflix',
    handle: '@netflix',
    avatar: 'src/assets/images/netflix.png',
    verified: true,
    
  },
  {
    name: 'Adele',
    handle: '@adele',
    avatar: 'src/assets/images/Adele.webp',
    verified: true,
    
  },
  {
    name: 'Nana 🎀',
    handle: '@cxxhime',
    avatar: 'src/assets/images/netflix.png',
    verified: true,
   
  },
];

const LeftSidebar = () => {
  return (
    <div className="hidden md:block w-[600px] sticky top-20 self-start space-y-6">
     
     <div className="bg-[#1f1f23] shadow-2xl rounded-2xl overflow-hidden">


        {/* Avatar */}
        <div className="relative">
        <div
  className="h-24 bg-cover bg-center relative"
  style={{ backgroundImage: "url('src/assets/images/nerves.jpg')" }}
>

            <div className="absolute -bottom-12 left-0 w-full flex justify-center">
              <div className="w-24 h-24 rounded-full  border-dark overflow-hidden">
                <img
                  src="src/assets/images/Avatar.avif"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile */}
        <div className="pt-14 pb-4 px-6 text-center">
          <h2 className="text-xl font-bold text-white mb-1">Yeremias NJ</h2>
          <p className="text-gray-400 text-sm mb-3">@notojoyoo</p>
          
          {/* Bio */}
          <p className="text-gray-300 text-sm mb-6">
            ✨ Penting gak Penting yang penting Posting ✨
          </p>
          
          {/* stats */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-base-700 py-4 mb-4">
            <div className="text-center">
              <div className="text-white font-bold text-lg">6,664</div>
              <div className="text-gray-400 text-xs">Following</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-lg">9,991</div>
              <div className="text-gray-400 text-xs">Followers</div>
            </div>
          </div>
          
          {/* the Button */}
          <a href="/profile" className="btn btn-primary btn-sm w-full">
            My Profile
          </a>
        </div>
      </div>

      {/* Suggestions to follow */}
      <div className="bg-[#1f1f23] p-6 rounded-2xl shadow-2xl">


        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users size={18} className="text-purple-500" />
            <span>Suggestions</span>
          </h2>
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-xs btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <ul className="divide-y divide-base-700">
          {whoToFollow.map((user, idx) => (
            <li key={idx} className="py-3 first:pt-0 last:pb-0 group hover:bg-base-800/20 -mx-2 px-2 rounded-lg transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover group-hover:ring-2 group-hover:ring-purple-600/30 transition-all"

                    />
                    {user.verified && (
                      <span className="absolute -right-1 -bottom-1 bg-purple-600 rounded-full p-0.5 shadow-lg">
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
                    <div className="flex items-center gap-1">
                      <p className="text-white font-medium group-hover:text-purple-400 transition-colors">
                        {user.name}
                      </p>
                      {user.mutualFriends > 0 && (
                        <span className="text-xs bg-base-700/60 text-gray-400 px-1.5 rounded-full">
                          {user.mutualFriends}+
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs">{user.handle}</p>
                  </div>
                </div>
                <button className="btn btn-sm bg-purple-600 hover:bg-purple-700 border-none text-white rounded-full px-4">
                  Suivre
                </button>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 pt-4 border-t border-base-100">
          <a
            href="/suggestions"
            className="flex items-center justify-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors font-medium"
          >
            Voir plus de suggestions
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg> 
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;