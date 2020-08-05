const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const Db = require("./users/users-model");
const dbConfig = require('./data/db-config.js');
const session = require('express-session')

const server = express();

const sessionConfig = {
    name:'monkey',
    secret: "keep it secret,keep it safe", //Changes in production
    cookie: {
        maxAge: 10000,
        secure: false, //In develpement this is okay.  It enables cookie to be sent when not secure
        httpOnly: true,  //Cookie cannot be accessed by JS
    },
    resave: false, //Recreate a session even if it hasnt changed?
    saveUninitialized: false, //GDPR compliance.  This will be dynamic because the user needs to opt-in to receive cookies.
}

server.use(session(sessionConfig))
server.use(helmet());
server.use(express.json());

function protected(req, res, next) {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: 'you shall not pass!!' });
    }
  }


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
                req.session.user = user;
                res.status(200).json({ message: `${user.name} is logged in!`})
            } else {
                res.status(401).json({errormessage: "You shall not pass!"})
            }
        })
        .catch(err => {
            res.status(500).json({ errormessage: "Could not get the user"})
        })
})

server.get("/api/users", protected,(req,res) => {
    Db.getUsers()
        .then(users =>{
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).json({ errormessage: 'Could not get the users'})
        })

})

server.get("/api/logout", (req,res) => {
    if (req.session) {
        req.session.destroy(err => {
          if (err) {
            res.send('error logging out');
          } else {
            res.send('good bye');
          }
        });
      }
})

module.exports = server;