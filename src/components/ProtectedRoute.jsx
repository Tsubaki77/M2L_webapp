import React from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../utils/api';

// Ce composant protège l'accès aux pages réservées aux gestionnaires connectés.
// Si personne n'est connecté, on renvoie directement vers la page de connexion.
const ProtectedRoute = ({ children }) => {
  const user = api.getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
