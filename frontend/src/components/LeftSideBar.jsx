import React from 'react';
import { Home, Bell, MessageSquare, User, Settings} from 'lucide-react';

const LeftSidebar = () => {
  const menuItems = [
    { icon: <Home size={22} />, to: '/', label: 'Accueil' },
    { icon: <MessageSquare size={22} />, to: '/messages', label: 'Messages' },
    { icon: <Bell size={22} />, to: '/notifications', label: 'Notifications' },
    { icon: <User size={22} />, to: '/profile', label: 'Profil' },
    { icon: <Settings size={22} />, to: '/settings', label: 'Paramètres' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-16 lg:w-64 sticky top-20 self-start">
        <div className="bg-gray-800 rounded-xl py-4 shadow-lg">
          <div className="flex flex-col items-center lg:items-stretch px-2 gap-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.to}
                className="flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-purple-600 group"
              >
                <div className="text-gray-400 group-hover:text-white">
                  {item.icon}
                </div>
                <span className="hidden lg:block text-gray-200 group-hover:text-white font-medium">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gray-800 border-t border-gray-700 z-40">
        <div className="flex justify-around py-2">
          {menuItems.slice(0, 5).map((item, index) => (
            <a key={index} href={item.to} className="p-3 text-gray-400 hover:text-purple-500">
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;