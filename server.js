const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const Db = require("./users/users-model");
const dbConfig = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());


server.post("/api/register",(req,res) => {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash
    Db.register(creds)
        .then(added => {
            res.status(201).json(added)
        })
        .catch(err => {
            res.status(500).json({message: 'You did not create a user'})
        })
})

server.post('/api/login', (req,res) => {
    const body = req.body

    Db.findUser(body)
        .then(user => {
            if(user && bcrypt.hashSync(body.password, user.password)){
                // req.session.user = user;
                res.status(200).json({ message: `${user.name} is logged in!`})
            } else {
                res.status(401).json({errormessage: "You are not logged in."})
            }
        })
        .catch(err => {
            res.status(500).json({ errormessage: "Could not get the user"})
        })
})

module.exports = server;