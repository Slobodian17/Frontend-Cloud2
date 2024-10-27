import React, { useEffect, useState } from "react";
import "./calendar.scss";
import plus from "./assets/plus.png";
import { logout } from "../../shared/logout.js";
import { getEvents } from "./api/getEvents.js";
import { useParams, Link } from "react-router-dom";
import { getCalendarById } from "../calendarAccess/api/getCalendarById.js";
import { getCalendars } from "../adminCalendars/api/getCalendars.js";
import { login } from "../login/api/login.js";
import { getAccesses } from "../calendarAccess/api/userCalendarAccess.js";

const days = [];
for (let i = 1; i <= 31; i++) {
    days.push(i);
}

const Calendar = () => {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [calendar, setCalendar] = useState(null);
    const [calendars, setCalendars] = useState([]);

    useEffect(() => {
        getEvents()
            .then(events => {
                return events.filter(event => event.calendar_id === +id)
                    .map(event => {
                        const { created_at } = event;
                        const day = new Date(created_at).getDate();
                        return {
                            ...event,
                            day
                        };
                    });
            })
            .then(setEvents);
    }, [id]);

    useEffect(() => {
        getCalendarById(id)
            .then(setCalendar);
    }, [id]);

    useEffect(() => {
        const credentials = localStorage.getItem("Authorization");
        Promise.all([login(credentials), getCalendars(), getAccesses()])
            .then(results => {
                const [user, calendars, accesses] = results;
                const filteredAccesses = accesses.filter(access => access.person_id === user.id);
                const filteredCalendarsByAccesses = calendars.filter(calendar => filteredAccesses.find(access => access.calendar_id === calendar.id));
                const filteredCalendarsByUser = calendars.filter(calendar => calendar.person_id === user.id);
                setCalendars([...filteredCalendarsByAccesses, ...filteredCalendarsByUser]);
            });
    }, []);
    return (
        <>
            <header>
                <div className="header-inner">
                    <div>
                        <h4>{calendar?.type}</h4>
                    </div>

                    <div className="dropdown-wrapper">
                        <div className="dropdown">
                            <Link to={'/calendars'}>
                                <div className="button-dropdown">My calendars</div>
                            </Link>
                            <div className="dropdown-options">
                                {
                                    calendars.map((calendar, index) => (
                                        <Link to={`/calendar/${calendar.id}`} key={index}>
                                            {calendar.type}
                                        </Link>
                                    ))
                                }
                                <hr/>
                                <Link to={"/events"}>
                                    My events
                                </Link>
                                <hr/>
                                <Link to={"/calendar/create"}>
                                    Create new calendar
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="group">
                        <button onClick={logout}>Logout</button>
                        <Link to={`/calendar/${id}/access`} >
                            <button>Users with access</button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="calendar">
                <div className="weekdays">
                    <div className="weekday">Sun</div>
                    <div className="weekday">Mon</div>
                    <div className="weekday">Tue</div>
                    <div className="weekday">Wed</div>
                    <div className="weekday">Thu</div>
                    <div className="weekday">Fri</div>
                    <div className="weekday">Sat</div>
                </div>
                <div className="days">
                    {
                        days.map(d => (
                            <div className="day" key={d}>
                                <div className="day-number">

                                    <p>{d}</p>
                                    <Link to={`/event/${id}/create`}>
                                        <img src={plus} alt="plus"/>
                                    </Link>
                                </div>

                                <div className="events">
                                    {
                                        events.filter(event => event.day === d)
                                            .map(event => (
                                                <div className="event" key={event.id}>
                                                    {event.title}
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Calendar;
