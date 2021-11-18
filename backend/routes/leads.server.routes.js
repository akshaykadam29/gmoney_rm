'use strict';

const router = require('express').Router();
const multiparty = require('multiparty');
const csvtojson = require('csvtojson');
const fs = require("fs");
const fastcsv = require("fast-csv");
const leadModel = require('../models/leads.server.model');
const rmUserModel = require('../models/addRm.sever.model');
const rmLeadAssignModel = require('../models/assignLeads.server.model');
const config = require('../config/jwtHelper');
const moment = require('moment');


router.post('/leads/saveAllLeads',config.verifyToken,async(req,res) => {
    var form = new multiparty.Form();
    form.parse(req, function(err,fields,files){
        if(err){
          console.log(err)
        }else{
           var singlefile = files.file[0];
        let csvData =[];
        let stream = fs.createReadStream(singlefile.path);
            let csvStream = fastcsv
                .parse()
                .on("data", function(data) {
                    csvData.push({
                    center: data[0],
                    address: data[1],
                    city: data[2],
                    contact: data[3],
                    mobile: data[4],
                    landline : data[5],
                    pincode : data[6],
                    email : data[7],
                    remark : data[8],
                    remark1 : data[9],
                    remark2 : data[10],
                    platform_type : data[11],
                    lead_assigned_to : data[12]
                    });     
                })
                .on("end", async function() {
                   csvData.shift();
                   csvData = await getIdFromLeadSavingInCsv(csvData);
                 await leadModel.insertMany(csvData,async function (err, docs) {
                      if (err){ 
                          console.error(err);
                      } else {
                        //var leadMapped = await autoMapLeadToUser(docs);
                        res.status(201).json({
                          message: "OK",
                      });
                      }
                    });
                });
                stream.pipe(csvStream);
    }
})
});

function getIdFromLeadSavingInCsv(csvData){
   var leadDataNew = [];
      return new Promise(function(resolve, reject) {
        csvData.forEach(async function(leadData){
          if(leadData.platform_type != ""){
            leadData.status = "social";
          }
          await rmUserModel.findOne({email : leadData.lead_assigned_to }).exec().then(data => {
            if(data != null){
              leadData.lead_assigned_to=data._id;
              leadDataNew.push(leadData);
            }else{
              leadData.lead_assigned_to= null;
              leadDataNew.push(leadData);    
            }  
          })
          if(csvData.length == leadDataNew.length){
            resolve(leadDataNew);
          }
      });
    });
}

  function autoMapLeadToUser(docs){
    console.log("FinalData" , docs)
  }

  router.get('/leads/getTotalLeadCount',config.verifyToken, (req,res) => {
    leadModel.count().exec().then(data => {
      res.send({
        count : data
      })
    });
  });

  router.get('/leads/getAllUnassignLead',config.verifyToken,(req,res) =>{
    leadModel.count({'lead_assigned_to' : null}).exec().then(data => {
      res.send({
        count : data
      })
    });
  });

  router.get('/leads/getAllAssignLead',config.verifyToken,(req,res) =>{
    leadModel.count({'lead_assigned_to' : {$ne:null}}).exec().then(data => {
      res.send({
        count : data
      })
    })
  });

  router.post('/leads/assignLeadToUser',config.verifyToken, (req,res)=> {
    const updateLeadDetails = {
      lead_assigned_to : req.body.userId
    }
    rmLeadAssignModel.findOne({ userId : req.body.userId }).exec().then(data=>{
      var assignedleadId = req.body.leadId;
      if(data){
          for(var i=0; i<assignedleadId.length; i++){
              data.leadId.push(assignedleadId[i])
          }
          const updateDocument = {
            leadId : data.leadId
            };
            rmLeadAssignModel.findByIdAndUpdate({_id : data._id}, updateDocument).exec().then(dataNew=>{
             assignedleadId.forEach(function(assignedLead){
               leadModel.findByIdAndUpdate({_id : assignedLead}, updateLeadDetails).exec(function(error, hosp){
               });
          });
          res.status(201).json({
              message: "OK",
              results : data
          });
       })
      .catch(err=>{
          res.json(err);
      }); 
  }
      else{
          const rmLeadassign = new rmLeadAssignModel({
              userId : req.body.userId,
              leadId : req.body.leadId,
          });
          rmLeadassign.save().then(data=>{
            assignedleadId.forEach(function(assignedLead){
              leadModel.findByIdAndUpdate({_id : assignedLead}, updateLeadDetails).exec(function(error, hosp){
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

  router.get('/leads/getAllDataSourceData/:dataParam',config.verifyToken,(req,res) =>{
    if(req.params.dataParam == "unassigned"){
      leadModel.find({'lead_assigned_to' : null}).exec().then(data => {
        res.send({
          results : data
        })
      })
    }
    if(req.params.dataParam == "assigned"){
      leadModel.find({'lead_assigned_to' : {$ne : null}}).populate(['lead_assigned_to']).exec().then(data => {
        res.send({
          results : data
        })
      })
    }
  });

  router.get('/leads/getRmAllAssignedLeadsById/:id/:tab', (req,res) => {
    var filter ;
    switch(req.params.tab){
          case 'assigned' : filter = {'lead_assigned_to' : req.params.id , 'status' : null} ; break;
          case 'call' : filter = {'lead_assigned_to' : req.params.id , 'status' : "Call-Later"} ; break;
          case 'visit' : filter = {'lead_assigned_to' : req.params.id , 'status' : "Visit"} ; break;
          case 'inProcess' : filter = {'lead_assigned_to' : req.params.id , 'status' : "In-Process"} ; break;
          case 'linkSent' : filter = {'lead_assigned_to' : req.params.id , 'status' : "Link-Sent"} ; break;
          case 'onboarded' : filter = {'lead_assigned_to' : req.params.id , 'status' : "Onboarded"} ; break;
          case 'notInterested' : filter = {'lead_assigned_to' : req.params.id , 'status' : "Not-Interested"} ; break;
          case 'doesntExist' : filter = {'lead_assigned_to' : req.params.id , 'status' : "Not-Exist"} ; break;
          case 'marketing' : filter = {'lead_assigned_to' : req.params.id , 'status' : "social" } ; break;
        } 
      leadModel.find(filter).exec().then(data =>{
        res.send({
          results : data
        });
      });
  });


  router.get('/leads/getRmAllAppointments/:id', (req,res) =>{
    leadModel.find({'lead_assigned_to' : req.params.id, $or:[ {'action': {$in : "Meeting" }}, {'action': {$in : "Call" } }] }).exec().then(data => {
      var events = [];
      var colorCode = '';
      data.forEach(function(data){
        var localDate = new Date( data.actionDate.date - ( data.actionDate.offset * 60000 ) );
        if(data.action == "Meeting"){
          colorCode = "green"
        }else{
          colorCode = "orange"
        }        
      events.push({
        color: colorCode,
        title: data.center,
        date : localDate
      });
    });
      res.send({
        results : events
      });
    });
  });

  router.post('/leads/saveLeadDetails', async(req,res) => {
    var historyArray = [];
    var time = null;
    var statusNew = "";
    if(!req.body.action == ""){
      const event = new Date(req.body.actionDate);
      time = {
        date: event,
        offset: event.getTimezoneOffset() 
      }
     }

     if(req.body.status == ""){
      statusNew = null;
     }else{
      statusNew = req.body.status;
     }

    await leadModel.findById({_id  : req.body.lead_id}).exec().then(data => {
      if(!data.history.length == 0){
        for(var i=0; i<data.history.length; i++){
          historyArray.push({
            date : data.history[i].date,
            status : data.history[i].status,
            remarks : data.history[i].remarks,
            action : data.history[i].action,
            actionDate : data.history[i].actionDate
          })
        }
      }
       historyArray.push(
        {
          date : Date.now(),
          status : req.body.status,
          remarks : req.body.remark,
          action : req.body.action,
          actionDate : time
        }
       ) 
     })
    const updatedDetails ={
      center : req.body.center,
      address : req.body.address,
      city : req.body.city,
      contact : req.body.contact,
      mobile : req.body.mobile,
      landline : req.body.landline,
      pincode : req.body.pincode,
      status : statusNew,
      remark : req.body.remark,
      cat : req.body.cat,
      action : req.body.action,
      actionDate : time,
      history : historyArray,
      updated_on : Date.now()
    }
    await leadModel.findByIdAndUpdate({_id : req.body.lead_id}, { $set : updatedDetails}, {new : true}).exec(function(error, data){
      if(res){
        res.send({
          results : data
        });
      }
      else{
        console.log(error)
      }
      
    });
  });

  router.get('/leads/getLeadsByUserInput/:id', async  (req,res) =>{
    var statusValue = '';
    if( req.query.tab == "assigned"){
      statusValue = null;
    }
    else if( req.query.tab == "marketing"){
      statusValue = "social";
    }
    else{
      statusValue = req.query.tab;
    }
    var paramValue = {
      $and : [
        {
          $or: [
            { "center": { "$regex": req.query.userInput, $options: 'i' } },
            { "address": { "$regex": req.query.userInput, $options: 'i' } },
            { "city" : { "$regex": req.query.userInput, $options: 'i' } },
            { "pincode" : { "$regex": req.query.userInput, $options: 'i' } },
            { "mobile" : { "$regex": req.query.userInput, $options: 'i' } },
            { "contact" : { "$regex": req.query.userInput, $options: 'i' } }
          ]
        },
        {
          'lead_assigned_to' : req.params.id 
        },
       {
         'status': statusValue
       }
      ]
    }
    leadModel.find(paramValue).exec().then(data => {
      res.send({
        results : data
      })
    });
  })

  router.get('/leads/getLeadByUserSearch/:userInput/:tab',config.verifyToken, async  (req,res) => {
    var paramCondtion = "";
    if(req.params.tab == "unassigned"){
      paramCondtion = null;
    }else{
      paramCondtion = {$ne : null};
    }
    var paramValue = {
            $and: [ 
              {
                $or: [
                  { "center": { "$regex": req.params.userInput, $options: 'i' } },
                  { "address": { "$regex": req.params.userInput, $options: 'i' } },
                  { "city": { "$regex": req.params.userInput, $options: 'i' } },
                  { "pincode" : { "$regex": req.params.userInput, $options: 'i' } },
                 
                ]
              },
              {'lead_assigned_to' : paramCondtion }
            ]
          }
    leadModel.find(paramValue).populate(['lead_assigned_to']).exec().then(data => {
            res.send({
              results : data
            });
          });
  });

  router.post('/leads/saveNewLeadDetails/:id', async (req,res) => {
    const saveNewLeadDetails = new leadModel({
      center : req.body.center,
      address : req.body.address,
      city : req.body.city,
      contact : req.body.contact,
      mobile : req.body.mobile,
      landline : req.body.landline,
      pincode : req.body.pincode,
      status : null,     
      lead_assigned_to : req.params.id,
      updated_on : Date.now()
    })
    await saveNewLeadDetails.save().then(doc=>{
      let results = updateLeadMapOnSingleLeadSave(doc);
      if(results){
        res.send({
          status : true
        })
      }
    })
  });

  function updateLeadMapOnSingleLeadSave(savedLead){
    return new Promise(async function(resolve, reject) {
    await rmLeadAssignModel.findOne({ userId : savedLead.lead_assigned_to }).exec().then(data=>{
      if(data)
        {
          data.leadId.push(savedLead._id);
          const updateDocument = {
            leadId : data.leadId,
            updated_on : Date.now()
            };
             rmLeadAssignModel.findByIdAndUpdate({_id : data._id}, { $set : updateDocument}, {new : true}).exec(function(error, mapped){
              if(mapped){
                  resolve(mapped)
              }
              else{
                resolve(error)
              }
            });
      }
      else{
        const mapRmAssignedLead = new rmLeadAssignModel({
            userId : savedLead.lead_assigned_to,
            leadId : savedLead._id,
            updated_on : Date.now()
          });
        
      mapRmAssignedLead.save().then(function(error,saved){
          if(saved){
            resolve(saved)
          }
          else{
            resolve(error)
          }
        })
      }
    });  
  });
  }



module.exports = router;