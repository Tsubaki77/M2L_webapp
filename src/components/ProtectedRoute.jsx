import React from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../utils/api';

const ProtectedRoute = ({ children }) => {
    const user = api.getUser();

    // Si pas d'utilisateur (pas de token), on redirige vers /login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si l'utilisateur est connecté, on affiche la page demandée
    return children;
};

export default ProtectedRoute;