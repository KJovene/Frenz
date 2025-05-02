import React from 'react';
import { Link } from 'react-router-dom';
import { Frown, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-[#272626] rounded-3xl shadow-2xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center">
            <Frown size={80} className="text-[#CCDF5E]" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-4 font-baloo">404</h1>
        <h2 className="text-3xl font-bold text-white mb-6 font-baloo">Page introuvable</h2>
        
        <p className="text-lg text-gray-300 mb-8 font-baloo">
          Oops ! La page que vous recherchez ne semble pas exister.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#CCDF5E] text-black font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 font-baloo"
        >
          <Home size={20} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;