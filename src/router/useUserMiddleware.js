import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../pages/login/api/login.js";


export const useUserMiddleware = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const credentials = localStorage.getItem("Authorization");
        if (!credentials) {
            navigate("/login");
        }
        login(credentials).then(setUser);
    }, []);
    return user;
};
