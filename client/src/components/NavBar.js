import React from 'react';
import { BrowserRouter as Router,Route, Switch, Link } from "react-router-dom";
import Register from "./Register.js";
import DisplayUsers from './DisplayUsers';
import Logout from './Logout.js';
import Login from './Login.js'

export default function NavBar(){
    return (
        <div>
        <Router>
            <div>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/users">See users</Link>
                <Link to="/logout">Log Out</Link>
            </div>

        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route  path="/register" component={Register}/>
            <Route  path="/users" component={DisplayUsers}/>
            <Route  path="/logout" component={Logout}/>
        </Switch>
        </Router>
        </div>

    )
}