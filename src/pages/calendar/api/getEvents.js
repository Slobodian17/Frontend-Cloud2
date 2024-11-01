export const getEvents = async () => {
    const response = await fetch("http://13.51.196.110:5000/events", {
        headers: {
            Authorization: localStorage.getItem("Authorization"),
            accept: "application/json",
            "content-type": "application/json",
        },
    });
    return response.json();
}
