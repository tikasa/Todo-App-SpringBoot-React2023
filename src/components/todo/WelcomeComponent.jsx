import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { retrieveHelloWorldPara } from './api/HelloWorldApiService'

export default WelcomeComponent

function WelcomeComponent() {

    const { username } = useParams()
    const [message, setMessage]=useState(null)
    
     function callHelloWorldRestApi() {
          
        retrieveHelloWorldPara('Kati')
            .then((response) => successfullResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanuptwo'))
    }

    function successfullResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }

    return (
        <div className='WelcomeComponent'>

            <h1>Welcome {username}!</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className='btn btn-success m-5' onClick={callHelloWorldRestApi}>Call Hello-World</button>
            </div>
            <div className='text-info'>{message}</div>
                
        </div>
    )
}
