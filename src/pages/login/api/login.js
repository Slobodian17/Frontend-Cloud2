export const login = async (encodedCredentials) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: encodedCredentials
        }
    };

    const response = await fetch("http://127.0.0.1:5000/user_login", config);
    const result = await response.json();
    return result;
};
