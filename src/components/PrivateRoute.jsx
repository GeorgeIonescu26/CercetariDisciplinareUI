import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
