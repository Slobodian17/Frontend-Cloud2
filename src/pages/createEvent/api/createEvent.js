export const createEvent = async (event, id) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/event/${id}`, {
            method: "POST",
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
