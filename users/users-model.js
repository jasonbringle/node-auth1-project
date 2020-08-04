const db = require('../data/db-config.js');

module.exports = {
    register,
    findUser
}


function register(user){
    return db('users')
        .insert(user)
        .then(val =>{
            return db("users")
                .where({id:val[0]})
        })
}

function findUser(user){
    return db('users')
        .where({name:user.name})
        .then(found => {
            return found[0]})
}

