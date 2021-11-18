const router = require("express").Router();
const config = require('../config/jwtHelper');
const Hospital = require('../models/hospital.server.model');
const Application = require('../models/application.server.model');
const Customer = require('../models/customer.server.model');
const AppStatus = require('../models/appStatus.server.model');
const ApplicationStatus = require('../models/applicationStatus.server.model');
const Scheme = require('../models/scheme.server.model');
const cpBrandModel = require('../models/channelPartnerBranding.model');
const ObjectId = require('mongodb').ObjectID;
 
router.get("/application/getAllAssignedHopitalById/:tab/:id",config.verifyToken,async (req,res)=> {
    var appStatusId = '';
    await AppStatus.find({value : req.params.tab}).select('_id').exec().then(data => {
        data.forEach(element => {
            appStatusId = element._id;
        });
    })

    Hospital.find({ rm_assigned : req.params.id , app_status : appStatusId }).populate(['app_status', 'rm_assigned']).exec().then(data => {
        res.send(data)
    }).catch(err => {
        res.json(err);
    })
});


router.get('/application/getAllApplicationByHospId/:tab/:id',config.verifyToken, async (req,res) => {
    var hospitalData = [];
    var applicationStatus = [];
    var rejected = [4,9];
    var inProcess = [0,1,2,3,5,6,7,8];
    var approved = [10]
    var filter ;
    switch(req.params.tab){
        case 'inProcess' : filter = {value : {$in : inProcess}}; break;
        case 'rejected' : filter = {value : {$in : rejected}}; break;
        case 'approved' : filter = {value : {$in : approved}}; break;
    }
   

    await Hospital.find({ rm_assigned : req.params.id }).select('_id').exec().then(data => {
                data.forEach(element => {
                    hospitalData.push(element._id);
                });
            });

    if(req.params.tab != 'disbursed'){
        await ApplicationStatus.find(filter).select('_id').exec().then(data => {
            data.forEach(element => {
                applicationStatus.push(element._id);   
            });        
        });    
        Application.find({hospital : {$in:hospitalData}, 'app_status.status' : {$in : applicationStatus}}).populate(['hospital','customer','app_status.status', 'risk_entry.scheme','offer.scheme']).exec().then(data1=>{
            res.send(data1)
        });             
    }
    else{
        await Application.find({'app_status.offer.disbursed' : {$ne : false}}).select('_id').exec().then(data => {
            data.forEach(element => {
                applicationStatus.push(element._id);   
            });        
        }); 

        Application.find({hospital : {$in:hospitalData}, _id : {$in : applicationStatus}}).populate(['hospital','customer','app_status.status', 'risk_entry.scheme','offer.scheme']).exec().then(data1=>{
            res.send(data1)
        });
    }    
});

router.get('/center/getAllImageById/:id', (req,res) =>{
    cpBrandModel.findById({_id : req.params.id }).exec().then(data => {
        res.send(data);
    });
});



router.get("/application/getAllDirectReporteeHospitalById/:tab/:id",config.verifyToken,async (req,res)=> {

    var appStatusId = '';
    var userId = req.params.id.split(',');

    await AppStatus.find({value : req.params.tab}).select('_id').exec().then(data => {
        data.forEach(element => {
            appStatusId = element._id;
        });
    })
    
    Hospital.find({ rm_assigned : { $in : userId}, app_status : appStatusId}).populate(['app_status', 'rm_assigned']).exec().then(data => {
        res.send({
            results : data
        })
    })
    .catch(err => {
        res.json(err);
    })
});


router.get('/application/getAllDirectReporteeApplicationById/:tab/:id',config.verifyToken, async (req,res) => {
    var userId = req.params.id.split(',');
    var hospitalData = [];
    var applicationStatus = [];
    var rejected = [4,9];
    var inProcess = [1,2,3,5,6,7,8];
    var approved = [10]
    var filter ;

    switch(req.params.tab){
        case 'inProcess' : filter = {value : {$in : inProcess}}; break;
        case 'rejected' : filter = {value : {$in : rejected}}; break;
        case 'approved' : filter = {value : {$in : approved}}; break;
    }
    await Hospital.find({ rm_assigned : {$in : userId }}).select('_id').exec().then(data => {
                data.forEach(element => {
                    hospitalData.push(element._id);
                });
            });

    if(req.params.tab != 'disbursed'){
        await ApplicationStatus.find(filter).select('_id').exec().then(data => {
            data.forEach(element => {
                applicationStatus.push(element._id);   
            });        
        });    
        Application.find({hospital : {$in:hospitalData}, 'app_status.status' : {$in : applicationStatus}}).populate(['hospital','customer','app_status.status', 'risk_entry.scheme']).exec().then(data1=>{
            res.send(data1)
        });             
    }
    else{
        await Application.find({'app_status.offer.disbursed' : {$ne : false}}).select('_id').exec().then(data => {
            data.forEach(element => {
                applicationStatus.push(element._id);   
            });        
        }); 

        Application.find({hospital : {$in:hospitalData}, _id : {$in : applicationStatus}}).populate(['hospital','customer','app_status.status', 'risk_entry.scheme']).exec().then(data1=>{
            res.send(data1)
        });
    }    
});



module.exports = router;
