module.exports = ( req, res, next ) => {
    if (req.session && req.session.user){
        next();
    } else {
        res.status(401).json({ message:  'You have no access... we cant determine that you have logged in.'})
    }
}