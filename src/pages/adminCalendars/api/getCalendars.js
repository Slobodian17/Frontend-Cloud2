export const getCalendars = async () => {
    const response = await fetch("http://127.0.0.1:5000/calendars", {
        headers: {
            Authorization: localStorage.getItem("Authorization"),
            accept: "application/json",
            "content-type": "application/json",
        },
    });
    return response.json();
};
