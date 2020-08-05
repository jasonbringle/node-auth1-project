const router = require('express').Router();
const bcrypt = require("bcryptjs");

const Db = require("../users/users-model.js");
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

router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(401).json({ message: 'Error logging out.', error:err});
            } else {
                res.json({message:'good bye'});
            }
        });
      } else{
          res.end()
      }
});

module.exports = router;