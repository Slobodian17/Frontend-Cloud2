import React, { useState } from "react";
import { giveAccess } from "./api/giveAccess.js";

const GiveAccess = () => {
    const [data, setData] = useState({
        userId: "",
        calendarId: ""
    });
    const handleChange = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await giveAccess(data.userId, data.calendarId).then(console.log);
    };
    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Create event</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="userId">User ID</label>
                    <input className="form-input" type="text" id="userId" name="userId"
                           onChange={handleChange} required/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="calendarId">Calendar ID</label>
                    <input className="form-input" type="text" id="calendarId" name="calendarId"
                           onChange={handleChange} required/>
                </div>

                <button className="form-submit" type="submit">OK</button>
                <button className="form-cancel" type="button">Cancel</button>
            </form>
        </div>
    );
};

export default GiveAccess;
