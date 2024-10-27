import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "./api/getCategories.js";
import { deleteCategory } from "./api/deleteCategory.js";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        // if(user) {
        getCategories()
            .then(categories => {
                setCategories(categories);
                setFilteredCategories(categories);
            });
        // }
    }, []);

    useEffect(() => {
        const filteredCategories = categories.filter(category => String(category.id).includes(query));
        setFilteredCategories(filteredCategories);
    }, [query, categories]);

    return (
        <>
            <header>
                <div className="header-inner">
                    <div>
                        <h4>Categories</h4>
                    </div>
                    <div>
                        <Link to={`/create/category`}>
                            <button>Create category</button>
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <div className="search-component">
                    <input type="number" className="search-input" value={query}
                           onChange={(e) => setQuery(e.target.value)}
                           placeholder="Enter a category id:"/>
                    {/* <button type="submit" className="search-submit">Search</button> */}
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Category ID</th>
                            <th>Title</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredCategories.map(category => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.title}</td>
                                    <td className="user-controls">
                                        <Link to={`/category/update/${category.id}`}>
                                            <button className="edit-btn">
                                                Edit
                                            </button>
                                        </Link>
                                        <button className="delete-btn"
                                                onClick={() => deleteCategory(category.id)}>
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

export default AdminCategories;
