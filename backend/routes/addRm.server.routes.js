'use strict';

const router = require('express').Router();
const config = require('../config/jwtHelper');
const RmUser = require('../models/addRm.sever.model');
const Designation = require('../models/addDesignation.server.model');

router.post('/user/createRM',config.verifyToken, (req,res) => {
    const addRm = new RmUser({
        name : req.body.username,
        email : req.body.email,
        mobile : req.body.mobile_number,
       password : req.body.password,
       region : req.body.region,
       state : req.body.state,
       city : req.body.city,
       locality : req.body.locality,
       pincode : req.body.pincode,
        designation : req.body.designation,
        reportingTo : req.body.reportTo
    });
    addRm.save().then(doc=>{
        res.send(doc);
    })
    .catch(err=>{
        res.json(err);
    });
});

router.get("/user/getAllRm",config.verifyToken, async (req,res) => {
    
    RmUser.find().exec().then(data=>{
            res.status(201).json({
                message: "OK",
                results : data
            });
    })
        .catch(err=>{
            res.json(err);
        }); 
});


router.get("/user/getAllDesignations",config.verifyToken, async (req,res) => {
    
    Designation.find().exec().then(data=>{
            res.status(201).json({
                results : data
            });
    })
        .catch(err=>{
            res.json(err);
        }); 
});

router.get("/user/getUserById/:id",config.verifyToken, (req,res)=> {
    RmUser.find({ designation : req.params.id }).exec().then(data => {
        res.status(201).json({
            results : data
        });
    }).catch(err => {
        res.json(err);
    })
});

router.get("/user/getUserByText", config.verifyToken, (req, res) => {
  
    var paramValue = {
    //  'app_status':'60506429669b211c1fa68acb',
      $or: [{
          "name": {
            "$regex": req.query.userInput,
            $options: 'i'
          }
        },
        {
          "city": {
            "$regex": req.query.userInput,
            $options: 'i'
          }
        }
      ]
    };
  
    // var hospital = new Hospital();
    RmUser.find(paramValue).select("name city state").exec().then(data => {
        if (data.length > 0) {
          res.json({
            results: data
          });
        } else {
          res.send({
            results: "No Data Found"
          });
        }
      })
      .catch(err => {
        res.json(err);
      });
  });

module.exports = router;