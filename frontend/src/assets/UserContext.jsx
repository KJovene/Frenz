import React, { createContext, useState, useContext } from 'react';

// Créez le contexte utilisateur
const UserContext = createContext();

// Fournisseur du contexte utilisateur
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte utilisateur
export const useUser = () => useContext(UserContext);