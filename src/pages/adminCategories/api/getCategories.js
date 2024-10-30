export const getCategories = async () => {
    const response = await fetch("http://13.60.196.234:5000/categories", {
        headers: {
            Authorization: localStorage.getItem("Authorization"),
            accept: "application/json",
            "content-type": "application/json",
        },
    });
    return response.json();
};
