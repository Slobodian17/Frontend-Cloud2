export const logout = () => {
    localStorage.removeItem("Authorization");
    window.location.href = '/login';
};
