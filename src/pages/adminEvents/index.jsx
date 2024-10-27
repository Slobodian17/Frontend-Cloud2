import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getEvents } from "../calendar/api/getEvents.js";
import { deleteEvent } from "./api/deleteEvent.js";

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [query, setQuery] = useState("");
    const formatDescription = (description) => {
        if(!description){
            return 'No description';
        }
        else if(description.length > 50){
            return description.slice(0,50)+'...';
        }
        else{
            return description;
        }
    }
    useEffect(() => {
        // if(user) {
        getEvents()
            .then(events => {
                setEvents(events);
                setFilteredEvents(events);
            });
        // }
    }, []);

    useEffect(() => {
        const filteredEvents = events.filter(event => String(event.id).includes(query));
        setFilteredEvents(filteredEvents);
    }, [query, events]);

    return (
        <>
            <header>
                <div className="header-inner">
                    <div>
                        <h4>Events</h4>
                    </div>

                </div>
            </header>

            <main>
                <div className="search-component">
                    <input type="number" className="search-input" value={query}
                           onChange={(e) => setQuery(e.target.value)}
                           placeholder="Enter a event id:"/>
                    {/* <button type="submit" className="search-submit">Search</button> */}
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Event ID</th>
                            <th>Title</th>
                            <th>Creation Date</th>
                            <th>Update Date</th>
                            <th>Content</th>
                            <th>Calendar ID</th>
                            <th>Category ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredEvents.map(event => (
                                <tr key={event.id}>
                                    <td>{event.id}</td>
                                    <td>{event.title}</td>
                                    <td>{event.created_at}</td>
                                    <td>{event.updated_at}</td>
                                    <td>{formatDescription(event.content)}</td>
                                    <td>{event.calendar_id}</td>
                                    <td>{event.person_id}</td>
                                    <td className="user-controls">
                                        <Link to={`/event/update/${event.id}`}>
                                            <button className="edit-btn">
                                                Edit
                                            </button>
                                        </Link>
                                        <button className="delete-btn"
                                                onClick={() => deleteEvent(event.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export default AdminEvents;
