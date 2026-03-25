import React from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../utils/api';

const ProtectedRoute = ({ children }) => {
    const user = api.getUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;