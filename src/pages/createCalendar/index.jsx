import React, { useState } from "react";
import { createCalendar } from "./api/createCalendar.js";


const CreateCalendar = () => {

    const [calendar, setCalendar] = useState({
        type: "",
        time_zone: ""
    })
    const handleChange = (e) => {
        setCalendar(prev => ({...prev, [e.target.name]:e.target.value}))
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await createCalendar(calendar)
        console.log(response)
    }
    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Create calendar</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="type">Type</label>
                    <input className="form-input" type="text" id="type" name="type"
                           onChange={handleChange} required/>
                </div>
                <div className="select-wrapper">
                    <select className="select" onChange={handleChange} name='time_zone'>
                        <option value="" disabled selected>Select timezone:</option>
                        <option value="1">1</option>
                        <option value="2">2</option>

                    </select>
                </div>

                <button className="form-submit" type="submit">OK</button>
                <button className="form-cancel" type="button">Cancel</button>
            </form>
        </div>
    );
};

export default CreateCalendar;
