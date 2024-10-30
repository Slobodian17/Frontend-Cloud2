export const deleteUser = async (id) => {
    try {
        const response = await fetch(`http://13.51.196.110:5000/user/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                accept: "application/json",
                "content-type": "application/json",
            }
        });

    } catch (e) {
        console.log(e);
    }
}
