export const getUserById = async (id) => {
    const response = await fetch(`http://13.60.196.234:5000/user/${id}`, {
        headers: {
            Authorization: localStorage.getItem("Authorization"),
            accept: "application/json",
            "content-type": "application/json",
        },
    });
    return await response.json();
};

export const updateUser = async (user, id) => {
    await fetch(`http://13.60.196.234:5000/user/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            Authorization: localStorage.getItem("Authorization"),
            accept: "application/json",
            "content-type": "application/json",
        },
    });
};
