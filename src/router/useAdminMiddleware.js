import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line import/extensions
import { login } from "../pages/login/api/login.js";

export const useAdminMiddleware = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const credentials = localStorage.getItem("Authorization");
        if (!credentials) {
            navigate("/login");
        }
        console.log(credentials)
        login(credentials)
            .then((response) => {
                if (response.isAdmin !== "1") {
                    navigate("/login");
                }
                setUser(response);
            });
    }, []);
    return user;
};
