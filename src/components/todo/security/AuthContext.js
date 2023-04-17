 import { createContext, useContext, useState, isAuthenticated, setAuthenticated } from "react";
import { executeBasicAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

//1: Create context
export const AuthContext = createContext()
 
//let's create a fast and easy hook
export const useAuth = () => useContext(AuthContext)

//2: Share the context between components
export default function AuthProvider({ children }) {
    
    //Put some state in context
    const [isAuthenticated, setAuthenticated] = useState(false)
    
    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    async function login(username, password) {
        const baToken = 'Basic ' + window.btoa(username + ":" + password)
        
        const response = await executeBasicAuthenticationService(baToken)
        
        try {
            if (response.status==200) {
                setAuthenticated(true)
                setUsername(username)
                setToken(baToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = baToken
                        return config
                    }
                )

                

                return true
            } else {
                logout()
                return false
           }   
        } catch {
            logout()
            return false
        }
 
    }

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)

    }
    
    return (
       
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
} 
