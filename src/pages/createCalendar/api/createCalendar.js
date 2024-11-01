export const createCalendar = async (calendar) => {
    try {
        const responce = await fetch("http://13.51.196.110:5000/calendar", {
            method: "POST",
            body: JSON.stringify(calendar),
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                accept: "application/json",
                "content-type": "application/json",
            }
        });
        const result = await responce.json();
        return result;
    } catch (e) {
        console.log(e);
    }
};
