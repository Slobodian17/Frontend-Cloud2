import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccesses } from "./api/userCalendarAccess.js";
import { getCalendarById } from "./api/getCalendarById.js";
import './calendarAccess.scss';

const CalendarAccess = () => {
    const { id } = useParams();
    const [calendar, setCalendar] = useState(null);
    const [accesses, setAccesses] = useState([]);
    console.log(calendar);
    useEffect(() => {
        getAccesses()
            .then(accesses => {
                setAccesses(accesses);
            });
    }, []);

    useEffect(() => {
        getCalendarById(id)
            .then(calendars => {
                setCalendar(calendars);
            });
    }, []);

    return (
        <>
            <header>
                <div className="header-inner">
                    <div>
                        <h2>Users with access to calendar: {calendar?.type}</h2>
                    </div>
                </div>
            </header>

            <main>
                <h4>If you want to give / remove access to calendar for someone, please, contact us on this email: test@gmail.com</h4>

                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Calendar id</th>
                            <th>User id</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            accesses.filter(access => access.calendar_id === +id)
                                .map((access, index) => (
                                    <tr key={index}>
                                        <td>{access.calendar_id}</td>
                                        <td>{access.person_id}</td>
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

export default CalendarAccess;
