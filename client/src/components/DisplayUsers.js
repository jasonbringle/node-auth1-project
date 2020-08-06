import React, { useState,useEffect } from "react";
import Axios from "axios";

export default function DisplayUsers(){
const [ users, setUsers ] = useState()
console.log(users)
    useEffect(()=>{
        Axios
        .get("http://localhost:7000/api/auth/users")
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => {
            alert("Could not get users!")
        })
    },[users])

    return (
        <div>
            <p>Display Users!</p>
        </div>
    )
}