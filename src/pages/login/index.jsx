import React from "react";
import { useState } from "react";
import { login } from "./api/login.js";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = `${user.username}:${user.password}`;
        const encodedCredentials = btoa(credentials);

        try {
            const resultUser = await login(`Basic ${encodedCredentials}`);
            localStorage.setItem("Authorization", `Basic ${encodedCredentials}`);
            console.log(user);

            if (resultUser.isAdmin === "1") {
                navigate("/admin")
            } else {
                navigate("/calendars")
            }
            // navigate(`/calendars`);
        } catch (e) {
            alert("Invalid login/password");
        }
    };

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username:</label>
                    <input className="form-input" type="text" id="username" name="username"
                           onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input className="form-input" type="password" id="password" name="password"
                           onChange={handleChange} required/>
                </div>
                <p>If you forgot password, contact us on this email: test@gmail.com</p>
                <button className="form-submit" type="submit">OK</button>
                <button className="form-cancel" type="button">Cancel</button>
            </form>
        </div>
    );
};

export default LoginPage;
