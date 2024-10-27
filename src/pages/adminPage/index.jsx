import React from "react";
import "./adminPage.scss"
import { Link } from "react-router-dom";
import calendar from "./assets/calendar1.png";
import user from "./assets/user.png";
import event from "./assets/event.png";
import category from "./assets/category.png";

const AdminPage = () => {
    return (
        <div className="wrapper">
            <div className="window-container">
                <Link to={`/admin/users`} >
                    <div className="window-section">
                        <div className="window-image">
                            <img src={user} alt="user"/>
                        </div>
                        <div className="window-description">
                            <h1>All users</h1>
                        </div>
                    </div>
                </Link>
                <Link to={`/admin/calendars`} >

                    <div className="window-section">
                        <div className="window-image">
                            <img src={calendar} alt="calendar"/>
                        </div>
                        <div className="window-description">
                            <h1>All calendars</h1>
                        </div>
                    </div>
                </Link>

                <Link to={`/admin/events`} >
                    <div className="window-section">
                        <div className="window-image">
                            <img src={event} alt="event"/>
                        </div>
                        <div className="window-description">
                            <h1>All events</h1>
                        </div>
                    </div>
                </Link>
                <Link to={`/admin/categories`} >
                    <div className="window-section">
                        <div className="window-image">
                            <img src={category} alt="category"/>
                        </div>
                        <div className="window-description">
                            <h1>All categories</h1>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminPage;
