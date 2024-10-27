import React, { useEffect } from "react";
import { useState } from "react";
import { getUserById, updateUser } from "./api/editUser.js";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminMiddleware } from "../../router/useAdminMiddleware.js";

const EditUser = () => {
    // useAdminMiddleware();
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",

    });

    useEffect(() => {
        getUserById(id)
            .then(setUser);
    }, []);

    const handleChange = (e) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        delete user.id;
        console.log(user);
        updateUser(user, id)
            .then(() => {
                navigate('/admin/users');
            });
    };

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Edit user</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username:</label>
                    <input className="form-input" type="text" id="username" name="username"
                           value={user.username} required onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input className="form-input" type="password" id="password" name="password"
                           required
                           onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="firstname">First name:</label>
                    <input className="form-input" type="text" id="firstname" name="firstname"
                           required
                           value={user.firstname} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="lastname">Last name:</label>
                    <input className="form-input" type="text" id="lastname" name="lastname" required
                           value={user.lastname} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-input" type="email" id="email" name="email" required
                           value={user.email}
                           onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="phoneNumber">Phone:</label>
                    <input className="form-input" type="text" id="phoneNumber" name="phone_number"
                           required
                           value={user.phone_number} onChange={handleChange}/>
                </div>

                <button className="form-submit" type="submit">OK</button>
                <button className="form-cancel" type="button">Cancel</button>
            </form>
        </div>
    );
};

export default EditUser;
