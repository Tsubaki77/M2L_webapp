import React from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../utils/api';

const ProtectedRoute = ({ children }) => {
    // AUTHENTIFICATION DÉSACTIVÉE - BYPASS MON
    // const user = api.getUser();
    //
    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }
    //
    // return children;

    return children;
};

export default ProtectedRoute;