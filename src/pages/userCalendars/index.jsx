import React from "react";
import { Link } from "react-router-dom";
import { deleteCalendar } from "../adminCalendars/api/deleteCalendar.js";
import { useEffect, useState } from "react";
import { getCalendars } from "../adminCalendars/api/getCalendars.js";
import { login } from "../login/api/login.js";

const UserCalendars = () => {
    const [calendars, setCalendars] = useState([]);
    const [filteredCalendars, setFilteredCalendars] = useState([]);
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
        Promise.all([login(credentials), getCalendars()])
            .then(results => {
                const [user, calendars] = results;
                const resultCalendars = calendars.filter(calendar => calendar.person_id === user.id);
                setCalendars(resultCalendars);
                setFilteredCalendars(resultCalendars);
            });

    }, []);

    useEffect(() => {
        const filteredCalendars = calendars.filter(calendar => String(calendar.id)
            .includes(query));
        setFilteredCalendars(filteredCalendars);
    }, [query, calendars]);

    return (

        <>
            <header>
                <div className="header-inner">
                    <div>
                        <h4>Calendars</h4>
                    </div>
                    <div>
                        <Link to={`/calendar/create`}>
                            <button>Create calendar</button>
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <div className="search-component">
                    <input type="number" className="search-input" value={query}
                           onChange={(e) => setQuery(e.target.value)}
                           placeholder="Enter a calendar id:"/>
                    {/* <button type="submit" className="search-submit">Search</button> */}
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Calendar ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Time zone</th>
                            <th>Creator id</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredCalendars.map(calendar => (
                                <tr key={calendar.id}>
                                    <td>{calendar.id}</td>
                                    <td>{calendar.type}</td>
                                    <td>{formatDescription(calendar.description)}</td>
                                    <td>{calendar.time_zone}</td>
                                    <td>{calendar.person_id}</td>
                                    <td className="user-controls">
                                        <Link to={`/calendar/${calendar.id}`}>
                                            <button className="edit-btn">
                                                Watch
                                            </button>
                                        </Link>
                                        <Link to={`/calendar/update/${calendar.id}`}>
                                            <button className="edit-btn">
                                                Edit
                                            </button>
                                        </Link>
                                        <button className="delete-btn"
                                                onClick={() => deleteCalendar(calendar.id)}>
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

export default UserCalendars;
