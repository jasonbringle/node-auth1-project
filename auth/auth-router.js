const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const Db = require("../users/users-model.js");
const secrets = require('../config/secrets.js')
const restricted = require("./restricted-middleware.js")

router.post("/register",(req,res) => {
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

router.get("/users", restricted,(req,res) => {
    Db.getUsers()
        .then(users =>{
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).json({ errormessage: 'Could not get the users'})
        })

})

router.post('/login', (req,res) => {
    const body = req.body

    Db.findUser(body)
        .then(user => {
            if(user && bcrypt.hashSync(body.password, user.password)){
                const token = generateToken(user)
                req.session.user = user;
                res.status(200).json({ message: `${user.name} is logged in!`,
                    token
                })
            } else {
                res.status(401).json({errormessage: "You shall not pass!"})
            }
        })
        .catch(err => {
            res.status(500).json({ errormessage: "Could not get the user"})
        })
})

function generateToken(user){
    const payload ={
        subject: user.id,
        username: user.username,
    }
     const options ={
         expiresIn: '8h',

     }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.log("There was an error when deleteing")

                res.status(401).json({ message: 'Error logging out.', error:err});
            } else {
                res.json({message:'good bye'});
            }
        });
      } else{
          res.status(200).json({message: "Youve been logged out."})
      }
});

module.exports = router;