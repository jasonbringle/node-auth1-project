import React from "react";
import axios from 'axios';

export default function Logout(){
    const logOut= () => {
        axios
        .get("http://localhost:7000/api/auth/logout")
        .then(res => {
            console.log(res.data.message)
        })
        .catch(err => {
            console.log({message:"There was an error"})
        })
    }
    return (
        <div>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}