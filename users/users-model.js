const db = require('../data/db-config.js');

module.exports = {
    register,
}


function register(user){
    return db('users')
        .insert(user)
        .then(val =>{
            return db("users")
                .where({id:val[0]})
        })
}

