import React from "react";
import { Link } from "react-router-dom";
import { deleteEvent } from "../adminEvents/api/deleteEvent.js";
import { useEffect, useState } from "react";
import { getEvents } from "../calendar/api/getEvents.js";
import { login } from "../login/api/login.js";

const UserEvents = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [query, setQuery] = useState("");
    const formatDescription = (description) => {
        if (!description) {
            return "No description";
        } else if (description.length > 50) {
            return description.slice(0, 50) + "...";
        } else {
            return description;
        }
    };
    useEffect(() => {

        const credentials = localStorage.getItem("Authorization");
        Promise.all([login(credentials), getEvents()])
            .then(results => {
                const [user, events] = results;
                const resultEvents = events.filter(event => event.person_id === user.id);
                setEvents(resultEvents);
                setFilteredEvents(resultEvents);
            });

    }, []);

    useEffect(() => {
        const filteredEvents = events.filter(event => String(event.id)
            .includes(query));
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
                           placeholder="Enter an event id:"/>
                    {/* <button type="submit" className="search-submit">Search</button> */}
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Event ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Creation date</th>
                            <th>Update date</th>
                            <th>content</th>
                            <th>Calendar id</th>
                            <th>Category id</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredEvents.map(event => (
                                <tr key={event.id}>
                                    <td>{event.id}</td>
                                    <td>{event.title}</td>
                                    <td>{formatDescription(event.description)}</td>
                                    <td>{event.created_at}</td>
                                    <td>{event.updated_at}</td>
                                    <td>{formatDescription(event.content)}</td>
                                    <td>{event.calendar_id}</td>
                                    <td>{event.category_id}</td>
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

export default UserEvents;
