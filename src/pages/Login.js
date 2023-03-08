import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
    
    return (
        <div>
            <h1>This is your login page</h1>
            <br/>
            <h4>Click below button to return to Homepage </h4>
            <center>
            <Link to="/">
            <button >Click here</button>
            </Link>
            </center>
        </div>
    );
}
export default Login;