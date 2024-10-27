import { createContext, useContext, useState } from "react";


const Context = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <Context.Provider value={{user, setUser}}>{children}</Context.Provider>
    )
}
export default AuthProvider
export const useAuthContext = () => useContext(Context)
