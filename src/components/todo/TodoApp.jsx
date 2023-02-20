import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link} from 'react-router-dom'
import './TodoApp.css'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <HeaderComponent/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <LoginComponent />}/>
                    <Route path='/login' element={ <LoginComponent />}/>
                    <Route path='/welcome/:username' element={<WelcomeComponent />}/>
                    <Route path='/todos' element={< ListTodosComponent />} />
                    <Route path='/logout' element={<LogoutComponent />}/>
                    <Route path='*' element={<ErrorComponent />}/>
                </Routes>
            </BrowserRouter>
            <FooterComponent/>
        </div>
    )
}

function LoginComponent() {

    const [username, setUserame] = useState('in28minutes')
    const [password, setPassword] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate();//returns a methdofor navigating
    

    function handleUsernameChange(event) {
        setUserame(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }   

    function handleSubmit() {
        if (username === 'in28minutes' && password === 'dummy') {
            setShowErrorMessage(false)
            setShowSuccessMessage(true)
            navigate(`/welcome/${username}`) //single quotes to ticks! /
        } else {
            console.log('Failed')
            setShowErrorMessage(true)
            setShowSuccessMessage(false)
       }
    }
/* 
    function MessageComponent() {
        if (showSuccessMessage) {
            return(<div className='successMessage'>Authenticated Successfully</div>)
        }return (<div className='errorMessage'>Authentication failed. Please check your credentials</div>)
    } */ 
    
  /*   function ErrorMessageComponent() {
        if (showErrorMessage) {
            return(<div className='errorMessage'>Authentication failed. Please check your credentials</div>)
        }return null
    } */

    return (
        <div className="LoginComponent">
            <h1>Time to Login!</h1>
            {/* Show the div only when the constant is TRUE */}
            {showSuccessMessage && <div className='successMessage'>Authenticated Successfully</div>}
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

function WelcomeComponent() {

    const {username} = useParams()

    return (
        <div className='WelcomeComponent'>

            <h1>Welcome {username}!</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
                
        </div>
    )
}
function ErrorComponent() {
    return (
        <div className="ErrorComponent">
            <h1>We are working relly hard!</h1>
            <div>Sorry about the 404.</div>
        </div>
    )
}


function ListTodosComponent() {

    const today = new Date()
    const targetDate=new Date(today.getFullYear()+12,today.getMonth(), today.getDay())

    const todos = [ { id: 1, description: 'Learn AWS',done:false, targetDate: targetDate },
                    { id: 2, description: 'Learn Full Stack Dev', done:false, targetDate: targetDate},
                    { id: 3, description: 'Learn DevOps', done:false, targetDate: targetDate }

                  ]

    return (
        <div className="container">
            <h1>Things you want to do</h1>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toDateString()}</td>
                                    </tr>
                                )  
                            )
                                    
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function HeaderComponent() {
    return (
        <div className="headerComponent">
           Header <hr/>
        </div>
    )
}
function FooterComponent() {
    return (
        <div className="footerComponent">
           <hr/> Footer
        </div>
    )
}

function LogoutComponent() {
    return (
        <div className="LogoutComponent">
            <h1>You are logged out!</h1>
            <div>Thank you for using out App. Come back soon!</div>
        </div>
    )
}
