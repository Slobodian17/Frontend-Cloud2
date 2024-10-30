export const deleteCalendar = async (id) => {
    try {
        const response = await fetch(`http://13.60.196.234:5000/calendar/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                accept: "application/json",
                "content-type": "application/json",
            }
        });

    } catch (e) {
        console.log(e)
    }
}
