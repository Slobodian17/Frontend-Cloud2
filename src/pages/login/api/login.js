export const login = async (encodedCredentials) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: encodedCredentials
        }
    };

    const response = await fetch("http://13.51.196.110:5000/user_login", config);
    const result = await response.json();
    return result;
};
