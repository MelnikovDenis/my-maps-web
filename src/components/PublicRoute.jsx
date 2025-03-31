import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PublicRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/main" />;
    }

    return <Outlet />;
};

export default PublicRoute;
