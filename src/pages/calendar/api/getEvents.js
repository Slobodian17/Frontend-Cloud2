export const getEvents = async () => {
    const response = await fetch("http://127.0.0.1:5000/events", {
        headers: {
            Authorization: localStorage.getItem("Authorization"),
            accept: "application/json",
            "content-type": "application/json",
        },
    });
    return response.json();
}
