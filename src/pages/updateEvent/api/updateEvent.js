export const updateEvent = async (event, id) => {
    try {
        const response = await fetch(`http://13.51.196.110:5000/event/${id}`, {
            method: "PUT",
            body: JSON.stringify(event),
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
