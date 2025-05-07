import React from 'react';
import { Link } from 'react-router-dom';
import { Frown, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden fixed inset-0">
      <div className="w-full max-w-lg mx-4 p-6 sm:p-8 bg-[#27272a] rounded-3xl shadow-2xl text-center">
        <div className="mb-4 sm:mb-6 flex justify-center">
          <div className="flex items-center justify-center">
            <Frown 
              size={60} 
              className="text-[#c084fc] sm:w-20 sm:h-20 md:w-24 md:h-24" 
            />
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-[#ffffff] mb-2 sm:mb-4 font-baloo">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#ffffff] mb-4 sm:mb-6 font-baloo">Page introuvable</h2>
        
        <p className="text-base sm:text-lg text-[#a1a1aa] mb-6 sm:mb-8 font-baloo">
          Oops ! La page que vous recherchez ne semble pas exister.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-[#9333ea] text-[#ffffff] font-bold rounded-full hover:bg-[#6b21a8] transition-all transform hover:scale-105 font-baloo border border-[#CCDF5E]"
        >
          <Home size={18} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;