export const register = async (user) => {
    const response = await fetch("http://127.0.0.1:5000/user/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json",
        },
    });
    return await response.json();
};
