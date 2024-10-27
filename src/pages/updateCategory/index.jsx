import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateCategory } from "./api/updateCategory.js";
import { getCategoryById } from "./api/getCategoryById.js";


const UpdateCategory = () => {
    const {id} = useParams()
    const [category, setCategory] = useState({
        title: ""
    })
    const handleChange = (e) => {
        setCategory(prev => ({...prev, [e.target.name]:e.target.value}))
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await updateCategory(category, id)
        console.log(response)
    }
    useEffect(() => {
        getCategoryById(id).then(category => {

            setCategory(prev => ({
                ...prev,
                title: category.title
            }))
        })
    }, [])

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Update category</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input className="form-input" type="text" id="title" name="title"
                           onChange={handleChange} value={category.title}  required/>
                </div>


                <button className="form-submit" type="submit">OK</button>
                <button className="form-cancel" type="button">Cancel</button>
            </form>
        </div>
    );
};

export default UpdateCategory;
