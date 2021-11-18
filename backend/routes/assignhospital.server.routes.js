
const router = require("express").Router();
const config = require('../config/jwtHelper');
const Hospital = require('../models/hospital.server.model');
const AssignHospital = require('../models/assignHospital.server.model');
const AppStatus = require('../models/appStatus.server.model');

router.get("/assignHospital/getAllHospitals",config.verifyToken, async (req,res) => {
    console.log("I am in Get All Hospital deatils");
    
    Hospital.find({rm_assigned : null, hid :{$ne : ''}}).exec().then(data=>{
            res.status(201).json({
                message: "OK",
                results : data
            });
    })
        .catch(err=>{
            res.json(err);
        }); 
});

router.get('/assignHospital/getAssignedHospital',config.verifyToken,(req,res)=> {
    Hospital.find({rm_assigned:{$ne:null}}).populate(['rm_assigned']).exec().then(data=>{
        res.status(201).json({
            message: "OK",
            results : data
        });
})
    .catch(err=>{
        res.json(err);
    });
});

router.get('/assignHospital/getInactiveHospital',config.verifyToken, async (req,res)=> {
    Hospital.find({is_disabled : true }).exec().then(data=>{
        res.status(201).json({
            message: "OK",
            results : data
        });
})
    .catch(err=>{
        res.json(err);
    });
});


router.post("/assignHospital/assignHospitalToUser",config.verifyToken, async (req,res) => {
    const updateHospDetails = {
        rm_assigned : req.body.userId
    }
    AssignHospital.findOne({ userId : req.body.userId }).exec().then(data=>{
        var hospitalId = req.body.assignedHospital;
        if(data){
            for(var i=0; i<hospitalId.length; i++){
                data.hospitalId.push(hospitalId[i])
            }
            const updateDocument = {
                hospitalId : data.hospitalId
              };
         AssignHospital.findByIdAndUpdate({_id : data._id}, updateDocument).exec().then(dataNew=>{
            hospitalId.forEach(function(assignedHospital){
                Hospital.findByIdAndUpdate({_id : assignedHospital}, updateHospDetails).exec(function(error, hosp){
                });
            });
            res.status(201).json({
                message: "OK",
                results : data
            });
        }).catch(err=>{
            res.json(err);
        }); 
    }
        else{
            const assign = new AssignHospital({
                userId : req.body.userId,
                designation : req.body.designation,
                hospitalId : req.body.assignedHospital,
            });
            assign.save().then(data=>{
                hospitalId.forEach(function(assignedHospital){
                    Hospital.findByIdAndUpdate({_id : assignedHospital}, updateHospDetails).exec(function(error, hosp){
                    });
                });
                res.status(201).json({
                    message: "OK",
                    results : data
                });
            }).catch(err=>{
                res.json(err);
            }); 
        }
    });
});

router.get('/assignHospital/alluserWithHospital',config.verifyToken, async (req,res) => {
    AssignHospital.find({}).populate(['hospitalId','userId','designation']).exec().then(data=>{
        res.status(201).json({
            message: "OK",
            results : data
        });
})
    .catch(err=>{
        res.json(err);
    }); 
});


router.get('/assignHospital/getCenterByUserSearch/:userInput/:tab',config.verifyToken, async (req,res) => {
    if(req.params.tab == "unassigned"){
      var paramValue = {
        $and: [ 
          {
            $or: [
              { "name": { "$regex": req.params.userInput, $options: 'i' } },
              { "city": { "$regex": req.params.userInput, $options: 'i' } },
              { "state": { "$regex": req.params.userInput, $options: 'i' } },
              { "hid": { "$regex": req.params.userInput, $options: 'i' } }
            ]
          },
          {rm_assigned : null, hid :{$ne : ''}}
        ]
      }
    Hospital.find(paramValue).exec().then(data=>{
            res.status(201).json({
                results : data
            });
        })
        .catch(err=>{
        res.json(err);
        });
    }

    if(req.params.tab == "assigned"){
      var paramValue = {
        $and: [ 
          {
            $or: [
                { "name": { "$regex": req.params.userInput, $options: 'i' } },
                { "city": { "$regex": req.params.userInput, $options: 'i' } },
                { "state": { "$regex": req.params.userInput, $options: 'i' } },
                { "hid": { "$regex": req.params.userInput, $options: 'i' } }                
            ]
          },
          {rm_assigned:{$ne:null}}
        ]
      }
        Hospital.find(paramValue).populate(['rm_assigned']).exec().then(data=>{
            res.status(201).json({
                results : data
            });
        })
        .catch(err=>{
        res.json(err);
        });
    }
  });


module.exports = router;
