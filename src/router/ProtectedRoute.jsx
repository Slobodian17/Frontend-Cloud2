import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { login } from "../pages/login/api/login.js";

const ProtectedRoute = ({ isAdmin }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const credentials = localStorage.getItem("Authorization");
        if (!credentials) {
            navigate("/login");
        }
        if (isAdmin) {

            login(credentials)
                .then(response => {
                    if (response.isAdmin !== "1") {
                        navigate("/login");
                    }
                });
        }
    }, [isAdmin]);
    return <Outlet/>
};

export default ProtectedRoute;
