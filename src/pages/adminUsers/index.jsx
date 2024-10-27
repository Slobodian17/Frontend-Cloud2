import React, { useEffect, useState } from "react";
import { getUsers } from "./api/getUsers.js";
import { deleteUser } from "./api/deleteUser.js";
import { Link } from "react-router-dom";


const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        getUsers()
            .then(users => {
                setUsers(users);
                setFilteredUsers(users);
            });
    }, []);

    useEffect(() => {
        const filteredUsers = users.filter(user => String(user.id).includes(query));
        setFilteredUsers(filteredUsers);
    }, [query, users]);

    return (
        <>
            <header>
                <div className="header-inner">
                    <div>
                        <h4>Users</h4>
                    </div>
                    <div>
                        <Link to={'/register'}>
                            <button>Create user</button>
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <div className="search-component">
                    <input type="number" className="search-input" value={query}
                           onChange={(e) => setQuery(e.target.value)}
                           placeholder="Enter a user id:"/>
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Is admin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{user.isAdmin}</td>
                                    <td className="user-controls">
                                        <Link to={`/users/${user.id}/edit`}>
                                            <button className="edit-btn">
                                                Edit
                                            </button>
                                        </Link>
                                        <button className="delete-btn"
                                                onClick={() => deleteUser(user.id)}>
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

export default AdminUsers;
