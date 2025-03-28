import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
