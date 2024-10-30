export const register = async (user) => {
    const response = await fetch("http://13.51.196.110:5000/user/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json",
        },
    });
    return await response.json();
};
