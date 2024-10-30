export const getCalendars = async () => {
    const response = await fetch("http://13.51.196.110:5000/calendars", {
        headers: {
            Authorization: localStorage.getItem("Authorization"),
            accept: "application/json",
            "content-type": "application/json",
        },
    });
    return response.json();
};
