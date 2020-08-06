import React, { useState } from "react";
import axios from "axios";


export default function Register() {
    const [ value, setValue ] = useState({
        name:'',
        password:''
      })
    
    const handleChange= e =>{
          setValue({
            ...value,
            [e.target.name]: e.target.value
          })
      }
    
    const submitHandler= e => {
      e.preventDefault()
        if(value.name && value.password){
          axios
          .post("http://localhost:7000/api/auth/register", value)
          .then(res=>{
            console.log(res.data)
            alert(`${res.data[0].name} has been added to the database!.. so exciting!`)} 
          )
          .catch(err => 
            alert('Could not submit the name and password...sorry.')
          )
          } else{
          alert('You must enter a name as well a password!')
          }
    }
return (
    <div>
        <form onSubmit={submitHandler}>
            <input type="text" onChange={handleChange} name='name' value={value.name} placeholder="Name"/>
            <input type="password" onChange={handleChange} name='password' value={value.password} placeholder="Password"/>
        <button>Add User</button>
      </form>
    </div>
)
}