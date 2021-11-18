const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var rmUserModel = require('../models/addRm.sever.model');

passport.use(new localStrategy({usernameField : 'email'},
  (username, password, done) => {
    rmUserModel.findOne({ email : username }, 
      (err, user) => {
      if(err){
        console.log("ERROR")
         return done(err);
      }
      else if(!user){
        console.log("No user")
        return done(null, false, { message: 'Email is not registered' });
      }
      else if(!user.verifyPassword(password)) {
        console.log("Incorrect Password")
        return done(null, false, { message: 'Incorrect Password' });
      }
      else{
        return done(null, user);
      }
    });
  })
);
