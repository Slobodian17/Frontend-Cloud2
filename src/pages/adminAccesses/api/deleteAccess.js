export const deleteAccess = async (user_id, calendar_id) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/calendar/get_access/${+user_id}/${+calendar_id}`, {
            method: "DELETE",
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                accept: "application/json",
                "content-type": "application/json",
            }
        });
    } catch (e) {
        console.log(e);
    }
};
