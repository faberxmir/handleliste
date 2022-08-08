const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

function initialize(passport){
    //verify function
    function authenticateUser(accessToken, refreshToken, profile, done){ 
        const user = User.getModel(passportLocalMongoose, findOrCreate);
        user.findOrCreate({ 
                userGoogleID: profile.id, 
                username: profile.displayName,
                email: profile.emails[0].value
            }, function(err, user){
                user.accessToken = accessToken;
                return done(err, user);
            });
    }

    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/authuser"
        }, authenticateUser));

    //passport uses these two methods to serialize and deserialize
    //the information provided to it.
    passport.serializeUser((user, done) => {
        console.info(`observe serializing: ${user}`)
        return done(null, user)});
    passport.deserializeUser((id, done) => {
        console.info(`observe deserializing: ${id}`)
        return done(null, id)});
}


module.exports = initialize;