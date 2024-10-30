export const getUsers = async () => {
    try {
        const responce = await fetch("http://13.51.196.110:5000/users");
        return await responce.json();

    } catch (e) {
        console.log(e);
    }
};
