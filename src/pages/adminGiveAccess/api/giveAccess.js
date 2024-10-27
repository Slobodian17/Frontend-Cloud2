export const giveAccess = async (userId, calendarId) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/calendar/get_access/${+userId}/${+calendarId}`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                accept: "application/json",
                "content-type": "application/json",
            }
        })
        console.log(+calendarId);
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
    }
};
