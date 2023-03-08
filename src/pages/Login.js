import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
    return (
        <div>
            <h1>This is your login page</h1>
            <Link to="/">
            <h3>
                Click here to go to HomePage
            </h3>
        </Link>
        </div>
    );
}
export default Login;