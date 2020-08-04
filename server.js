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

module.exports = server;