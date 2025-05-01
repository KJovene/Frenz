import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Non Trouvée</h1>
      <p className="text-lg text-gray-600 mb-6">
        Désolé, la page que vous recherchez n'existe pas.
      </p>
      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;