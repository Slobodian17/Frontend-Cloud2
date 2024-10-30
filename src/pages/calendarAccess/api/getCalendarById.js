export const getCalendarById = async (id) => {
    try {
        const response = await fetch(`http://13.51.196.110:5000/calendar/${id}`, {
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
