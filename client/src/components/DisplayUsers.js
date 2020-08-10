import React, { useState,useEffect } from "react";
import axios from "axios";

export default function DisplayUsers(){
const [ users, setUsers ] = useState()
    useEffect(()=>{
        axios
        .get("http://localhost:7000/api/users")
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => {
            alert("Could not get users!")
        })
    },[])

    return (
        <div>
            {users && users.map(user => 
                <div key={user.id}>
                    <h1>{user.name}</h1>
            <p>{user.id}</p>
                </div>)}
            
        </div>
    )
}