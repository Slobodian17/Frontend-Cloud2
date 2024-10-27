import React, { useEffect } from "react";
import { useState } from "react";
import { createEvent } from "./api/createEvent.js";
import { useParams } from "react-router-dom";
import { getCategories } from "../adminCategories/api/getCategories.js";

const CreateEvent = () => {
    const {id} = useParams();
    const [categories, setCategories] = useState([]);
    const [event, setEvent] = useState({
        title: "",
        description: "",
        content: "",
        category_id: 0
    })
    const handleChange = (e) => {
        setEvent(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentTime = new Date();  // Get the current time

        const year = currentTime.getFullYear();        // Get the current year
        const month = currentTime.getMonth() + 1;     // Get the current month (0-11, so add 1)
        const day = currentTime.getDate();            // Get the current day
        const hours = currentTime.getHours();         // Get the current hours
        const minutes = currentTime.getMinutes();     // Get the current minutes
        const seconds = currentTime.getSeconds();     // Get the current seconds

        // Format the date and time as a string
        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const dateEvent = {
            ...event,
            category_id: +event.category_id,
            created_at: formattedTime,
        };


        const response = await createEvent(dateEvent, id);
        console.log(response);
    };
    console.log(categories)
    useEffect(() => {
        getCategories().then(setCategories)

    }, [])
    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Create event</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input className="form-input" type="text" id="title" name="title"
                           onChange={handleChange} required/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="description">Description</label>
                    <input className="form-input" type="text" id="description" name="description"
                           onChange={handleChange} required/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="content"> Content (Optional)</label>
                    <textarea className="form-textarea" rows="5" id="content" name="content"
                              onChange={handleChange} required></textarea>
                </div>
                <div className="select-wrapper">
                    <select className="select" name="category_id" value={event.category_id} onChange={handleChange}>
                        {
                            categories.map(category => (
                                <option value={category.id} key={category.id}>{category.title}</option>
                            ))
                        }
                        {/* <option value="">Select category</option> */}
                        {/* <option value={1}>Travel</option> */}
                        {/* <option value={2}>Job</option> */}
                        {/* <option value={3}>Birthday</option> */}
                        {/* <option value={4}>...</option> */}
                    </select>
                </div>


                <button className="form-submit" type="submit">OK</button>
                <button className="form-cancel" type="button">Cancel</button>
            </form>
        </div>
    );
};

export default CreateEvent;
