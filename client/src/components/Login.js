import React, { useState } from "react";
import axios from 'axios';

export default function Login(){
const [ login, setLogin] = useState({
    name:'',
    password:''
})

const handleChange = e => {
    setLogin({
        ...login,
        [e.target.name]: e.target.value
    })
}

    const logIn= () => {
        axios
        .post("http://localhost:7000/api/auth/login", login)
        .then(res => {
            console.log("LOGIN response",res)
        })
        .catch(err => {
            console.log({message:"There was an error"})
        })
    }
    return (
        <div>
            <input type="text" onChange={handleChange} name='name' value={login.name} placeholder="Name"/>
            <input type="password" onChange={handleChange} name='password' value={login.password} placeholder="Password"/>
        
            <button onClick={logIn}>Login</button>
        </div>
    )
}