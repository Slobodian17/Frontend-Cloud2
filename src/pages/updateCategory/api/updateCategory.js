export const updateCategory = async (category, id) => {
    try {
        const response = await fetch(`http://13.51.196.110:5000/category/${id}`, {
            method: "PUT",
            body: JSON.stringify(category),
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                accept: "application/json",
                "content-type": "application/json",
            }
        });
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
    }
};
