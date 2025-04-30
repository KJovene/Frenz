// src/components/layout/AuthLayout.jsx
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ 
  children, 
  title, 
  buttonLabel, 
  alternativePath,
  alternativeText,
  alternativeLinkText
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#171717] p-4">
      {/* Single container with both image and form - optimized proportions */}
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg shadow-xl">
        {/* Left side with image */}
        <div className="relative hidden md:block md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" 
            alt="Nature background"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Just post it !</h1>
            <p className="text-xl">And discover the world around you</p>
          </div>
        </div>

        {/* Right side with auth form */}
        <div className="w-full md:w-1/2 bg-[#272626] p-6 text-white">
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold mb-3">Frenz</h2>
            
            <div className="flex justify-center space-x-4 mb-4">
              <button className="p-2 rounded-full">
                <Facebook size={20} />
              </button>
              <button className="p-2 rounded-full">
                <Instagram size={20} />
              </button>
              <button className="p-2 rounded-full">
                <Twitter size={20} />
              </button>
            </div>
            
            <p className="text-sm">Or use your email account</p>
          </div>

          {children}

          <div className="text-center mt-4">
            <p className="text-sm">
              {alternativeText}{" "}
              <Link 
                to={alternativePath} 
                className="ml-1 text-[#CCDF5E] hover:underline"
              >
                {alternativeLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;