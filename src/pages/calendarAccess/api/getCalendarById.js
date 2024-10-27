export const getCalendarById = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/calendar/${id}`, {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                accept: "application/json",
                "content-type": "application/json",
            },
        });
        return response.json();
    } catch (e) {
        console.log(e);
    }
};
