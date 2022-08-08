//For testing only, should not reach git repo..
const router = require('express').Router();
const passport = require('passport');
const initializePassport = require('../modules/passport-config');

initializePassport(passport);

router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));

router.get('/authuser', 
    passport.authenticate('google', {failureRedirect: `http://localhost:3001/403`}),
    function(req, res){
        console.log('got through to authuser!')
        //console.log(`user emails field ${req.user.emails}`);
        res.redirect('http://localhost:3001/');
    });

// None of these routes should be reachable if not authorized, so check them all,
// then handle appropriately. 
router.use('*', 
    passport.authenticate('session', {failureRedirect: `http://localhost:3000/`}), 
    (req, res, next) => {
        console.log('authentication * route')
        if(req.user){
            // const headers = req.headers;
            // res.headers.authorization = user.accessToken;
            // console.log(header);
            next();
        } else {
            // const content = JSON.stringify(req);
            // console.log(`denied login \n ${content}`);
            res.json({"message":"not authorized"});
        }
    });

router.get('/user', (req, res) => {
    res.json({"message" : "authorized", "user" : req.user});
})

router.get('/logout', (req, res) => {
    req.logout(err => {
        if(err) console.log(err);
        else res.redirect('http://localhost:3001/');
    })
})

router.get('/secret', (req, res) => {
    console.log(`user data before secret ${JSON.stringify(req.user)}`);
    //if(req.user){
    res.json({secret:`${req.user.username} please dont tell anyone this email: ${req.user.email}`});
    //} 
    })

module.exports = {
    router
};
