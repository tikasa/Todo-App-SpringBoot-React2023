/* 
//import { useAuth } from "./security/AuthContext";

export default FooterComponent

function FooterComponent() {


    return (
    
        <footer className="footerComponent">
            <div className="container">
                Your footer
            </div>
            
        </footer>
    )
} */

import { useContext } from "react";
import { AuthContext } from "./security/AuthContext";

function FooterComponent() {
    const authContext = useContext(AuthContext)

    console.log(`Footer component - ${authContext.number}`);

    return (
        <footer className="footer">
            <div className="container">
                Your Footer
            </div>
        </footer>
    )
}

export default FooterComponent