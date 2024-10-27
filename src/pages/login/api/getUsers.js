export const getUsers = async () => {
    try {
        const responce = await fetch("http://127.0.0.1:5000/users");
        return await responce.json();

    } catch (e) {
        console.log(e);
    }
};
