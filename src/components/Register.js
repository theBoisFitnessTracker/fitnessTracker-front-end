import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const Register = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState('')
    const navigate = useNavigate();
 
    async function registerHandler(event) {
        event.preventDefault();
        if (password.length < 8) {
            setError("password needs to be at least 8 characters")
        } else {
            try {
                const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                            username,
                            password
                    })
                })
                const data = await response.json()
                localStorage.setItem("token", data.token)
                console.log(data.token)
                console.log(data)
                navigate("/routines")
            } catch (error) {
                console.log(error)
            }
        }
    }
 
    const changeUsername = (event) => setUsername(event.target.value)
    const changePassword = (event) => setPassword(event.target.value)
    return (
        <form onSubmit={registerHandler}>
            <div>Username:</div>
            <input placeholder='Enter Username...' type='text' value={username} onChange={changeUsername}></input>
            <br/><br/>
            <div>Password:</div>
            <input placeholder='Enter Password...' type='password' value={password} onChange={changePassword}></input>
            <br/><br/>
            <p>{error}</p>
            <button type='submit'>Sign Up</button>
        </form>
    )
    
};
 
export default Register;