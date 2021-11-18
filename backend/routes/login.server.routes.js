'use strict';
const router = require('express').Router();
var passport = require('passport');
const Designation = require('../models/addDesignation.server.model');

router.post('/userLogin/login',(req,res, next) => {
  passport.authenticate('local',(err, user, info) => {
      if(err){
        return res.status(400).json(err);
      }
      else if(user){
        var token = user.generateJwt();
        Designation.findOne({ _id : user.designation }).exec().then(data=>{
            return res.send({
              success: true,
              name:user.name,
              email:user.email,
              token: token,
              desig : data.designation
          });
        });
      }
      else{
        return res.status(404).json(info);
      }
    })(req, res);
});


module.exports = router;