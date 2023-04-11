 import { createContext, useContext, useState, isAuthenticated, setAuthenticated } from "react";

//1: Create context
export const AuthContext = createContext()
 
//let's create a fast and easy hook
export const useAuth = () => useContext(AuthContext)

//2: Share the context between components
export default function AuthProvider({ children }) {
    
    //Put some state in context
    const [isAuthenticated, setAuthenticated] = useState(false)
    
    const [username, setUsername] = useState(null)

    function login(username, password) {
        if (username === 'in28minutes' && password === 'dummy') {
            setAuthenticated(true)
            setUsername(username)
            return true
        } else {
            setAuthenticated(false)
            setUsername(null)
            return false
       }       
    }
    function logout() {
        setAuthenticated(false)
    }
    
    return (
       
        <AuthContext.Provider value={{isAuthenticated, login, logout, username}}>
            {children}
        </AuthContext.Provider>
    )
} 
