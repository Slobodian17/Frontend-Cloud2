import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAccesses } from "../calendarAccess/api/userCalendarAccess.js";
import { deleteAccess } from "./api/deleteAccess.js";

const AdminAccesses = () => {
    const [accesses, setAccesses] = useState([]);

    useEffect(() => {
        // if(user) {
        getAccesses()
            .then(accesses => {
                setAccesses(accesses);

            });
        // }
    }, []);


    return (
        <>
            <header>
                <div className="header-inner">
                    <div>
                        <h4>Accesses</h4>
                    </div>
                    <div>
                        <Link to={`/access/give`}>
                            <button>Give access</button>
                        </Link>
                    </div>
                </div>
            </header>

            <main>

                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Calendar ID</th>
                            <th>User ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            accesses.map(access => (

                                <tr key={access.calendar_id}>
                                    <td>{access.calendar_id}</td>
                                    <td>{access.person_id}</td>
                                    <td className="user-controls">
                                        <button className="delete-btn"
                                                onClick={() => deleteAccess(access.person_id, access.calendar_id)}>
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

export default AdminAccesses;
