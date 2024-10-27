import React, { useState } from "react";
import { createCategory } from "./api/createCategory.js";


const CreateCalendar = () => {
    const [category, setCategory] = useState({
        title: ""
    })
    const handleChange = (e) => {
        setCategory(prev => ({...prev, [e.target.name]:e.target.value}))
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await createCategory(category)
        console.log(response)
    }
    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Create category</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input className="form-input" type="text" id="title" name="title"
                           onChange={handleChange} required/>
                </div>

                <button className="form-submit" type="submit">OK</button>
                <button className="form-cancel" type="button">Cancel</button>
            </form>
        </div>
    );
};

export default CreateCalendar;
