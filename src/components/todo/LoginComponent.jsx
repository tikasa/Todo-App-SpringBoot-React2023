import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'

export default LoginComponent

function LoginComponent() {

    const [username, setUserame] = useState('in28minutes')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()//returns a methdo for navigating

    const authContext = useAuth()
    

    function handleUsernameChange(event) {
        setUserame(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }   

    function handleSubmit() {
        if (authContext.login(username,password)) {
            navigate(`/welcome/${username}`) //single quotes to ticks! /
        } else {
            setShowErrorMessage(true)
       }
    }


    return (
        <div className="LoginComponent">
            <h1>Time to Login!</h1>
            {/* Show the div only when the constant is TRUE */}
            {showErrorMessage && <div className='errorMessage'>Authentication failed. Please check your credentials</div>}
         
            <div className='LoginForm'>
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="button" name="login" onClick={handleSubmit}>login</button>
            </div>
        </div>
        
    )
}