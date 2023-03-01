import { createContext, useContext, useState, isAuthenticated, setAuthenticated } from "react";

//1: Create context
export const AuthContext = createContext();
 
//let's create a fast and easy hook
export const useAuth = () => useContext(AuthContext)

//2: Share the context between components
export default function AuthProvider({ children }) {
    
    //Put some state in context
    const [isAuthenticated,setAuthenticated]=useState(false)

    function login(username, password) {
        if (username === 'in28minutes' && password === 'dummy') {
            setAuthenticated(true)
            return true
        } else {
            setAuthenticated(false)
            return false
       }       
    }
    function logout() {
        setAuthenticated(false)
    }
    
    return (
       
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}