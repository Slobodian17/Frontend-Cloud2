import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "./api/getEventById.js";
import { updateEvent } from "./api/updateEvent.js";

const UpdateEvent = () => {
    const {id} = useParams()
    const [event, setEvent] = useState({
        title: "",
        description: "",
        content: ""
    })
    const handleChange = (e) => {
        setEvent(prev => ({...prev, [e.target.name]:e.target.value}))
    }
    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await updateEvent(event, id)
        console.log(response)
    }
    useEffect(() => {
        const currentTime = new Date();  // Get the current time

        const year = currentTime.getFullYear();        // Get the current year
        const month = currentTime.getMonth() + 1;     // Get the current month (0-11, so add 1)
        const day = currentTime.getDate();            // Get the current day
        const hours = currentTime.getHours();         // Get the current hours
        const minutes = currentTime.getMinutes();     // Get the current minutes
        const seconds = currentTime.getSeconds();     // Get the current seconds

        // Format the date and time as a string
        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        getEventById(id).then(event => {
            setEvent(prev => ({
                ...prev,
                title: event.title,
                description: event.description,
                content: event.content,
                updated_at: formattedTime,
            }))
        })
    }, [])
    console.log(event)
    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Edit event</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input className="form-input" type="text" id="title" name="title"
                           value={event.title} onChange={handleChange} required/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="description">Description</label>
                    <input className="form-input" type="text" id="description" name="description"
                           value={event.description} onChange={handleChange} required/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="content"> Content (Optional)</label>
                    <textarea className="form-textarea" rows="5" id="content" name="content"
                              value={event.content} onChange={handleChange} required></textarea>
                </div>


                <button className="form-submit" type="submit">OK</button>
                <button className="form-cancel" type="button">Cancel</button>
            </form>
        </div>
    );
};

export default UpdateEvent;
