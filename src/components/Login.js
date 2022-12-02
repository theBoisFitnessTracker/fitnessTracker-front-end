

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

 
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
 
    function handleUsernameChange(event) {
        console.log(event.target.value);
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        console.log(event.target.value);
        setPassword(event.target.value);
    }
 
    async function setRegisterInfo(event) {
        event.preventDefault()
        try {
            const response = await fetch(
                'http://fitnesstrac-kr.herokuapp.com/api/users/login',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        
                    },
                    body: JSON.stringify({
                            username: username,
                            password: password
                        
                    })
                }
            )
            const data = await response.json();
            console.log("This was our request's returned promise: ", data.token);
            localStorage.setItem("token", data.token);
            navigate("/Routines");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div>
                <h1>Login to your account</h1>
                <br/>
                <form onSubmit={setRegisterInfo}>
                    <label>Username:</label><br/>
                    <input
                        placeholder="Enter Username..."
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    ></input>
                    <br/><br/>
                    <label>Password:</label><br/>
                    <input
                        placeholder="Enter Password..."
                        type="text"
                        value={password}
                        onChange={handlePasswordChange}
                    ></input><br/><br/>
                        <button type="submit">Login</button>
                </form>
                <p> Don't have a login? <Link to="Register">Register Here!</Link></p>
            </div>
        </div>
    )
};
 
export default Login;