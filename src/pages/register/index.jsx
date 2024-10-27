import React from 'react';
import {useState} from "react";
import {register} from "./api/register.js";
import {useAuthContext} from "../../context/AuthContext.jsx";

const RegisterPage = () => {
    const {setUser: setAuth} = useAuthContext()

    const [user, setUser] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
        isAdmin: '',
    })

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register(user).then(setAuth)
    }

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username:</label>
                    <input className="form-input" type="text" id="username" name="username" required
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input className="form-input" type="password" id="password" name="password" required
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="firstname">First name:</label>
                    <input className="form-input" type="text" id="firstname" name="firstname" required
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="lastname">Last name:</label>
                    <input className="form-input" type="text" id="lastname" name="lastname" required
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-input" type="email" id="email" name="email" required
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="phone_number">Phone:</label>
                    <input className="form-input" type="text" id="phone_number" name="phone_number" required
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="role">Role:</label>
                    <select className="form-input" id="role" name="isAdmin" defaultValue='0' required onChange={handleChange}>
                        <option value="1">Admin</option>
                        <option value="0">User</option>
                    </select>
                </div>
                <button className="form-submit" type="submit">OK</button>
                <button className="form-cancel" type="button">Cancel</button>
            </form>
        </div>
    );
};

export default RegisterPage;
