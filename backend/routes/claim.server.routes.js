const router = require('express').Router();
const hospitalModel = require('../models/hospital.server.model');
const hospRmMappingModel = require('../models/assignHospital.server.model');
const schemeModel = require('../models/scheme.server.model');
const rmSchemeModel = require('../models/rmSchemeMapping.server.model');

    router.get('/claim/getAllUnClaimedHospitalsCount', (req,res)=>{
        hospitalModel.countDocuments({rm_claimed : null, hid : {$ne : ""}}).exec().then(data => {
            res.send({
                results : data
            })
        });
    });

    router.get('/claim/getAllClaimedHospitalsCount', (req,res) => {
        hospitalModel.countDocuments({ rm_claimed : {$ne : null}, hid : {$ne : ""}}).exec().then(data => {
            res.send({
                results : data
            });
        });
    });

    router.get('/claim/getAllClaimedHospitalsCountByRmId/:rmid', (req,res) => {
        hospitalModel.countDocuments({ rm_claimed : req.params.rmid, hid : {$ne : ""}}).exec().then(data => {
            res.send({
                results : data
            });
        });
    });

    router.get('/claim/getAllSchemeApprovalPendingcount', (req,res) =>{
      rmSchemeModel.countDocuments({approvedScheme : false}).exec().then(data => {
        res.send({
          results : data
        });
      });
    });

    // Get Claimed, UnClaimed, Claimed By Rm Hospitals are displayed by Method : getAllClaimHospitalTab
    router.get('/claim/getAllHospitalsByCliamTabs', (req,res) => {
        var filter;
        console.log(req.query.tab)
        switch(req.query.tab){
            case 'unClaimed' : filter = { rm_claimed : null, hid : {$ne : ""} }; break;
            case 'claimed' : filter = { rm_claimed : {$ne : null}, hid : {$ne : ""} }; break;
            case 'myClaimed' : filter = { rm_claimed : req.query.rmId, hid : {$ne : ""} }; break;
            case 'approval' : filter = { approvedScheme : false }; break;
        }
        if(req.query.tab == "myClaimed"){
            hospitalModel.find(filter).select(['hid','name','address','city','state','pincode','created_on']).populate('rm_claimed','name').populate('scheme.allocation').populate('rm_claim_dispute', 'name').sort({created_on:-1}).exec().then(data => {
              res.send({
                  results : data
              })
            });
        }
        else if(req.query.tab == "claimed" || req.query.tab == "unClaimed" ){
          hospitalModel.find(filter).select(['hid','name','address','city','state','pincode','created_on']).populate('rm_claimed','name').populate('rm_claim_dispute', 'name').sort({created_on:-1}).exec().then(data => {
            res.send({
                results : data
            })
          });
      }
        else{
          rmSchemeModel.find(filter).populate('userId', 'name').populate('hospitalId', ['name','hid','address','state','city','pincode','created_on']).populate('defaultScheme?.policy','name').populate('defaultScheme?.nonPolicy','name').populate('allocatedSchemes','name').sort({created_on:-1}).exec().then(data => {
            res.send({
              results : data
            });
          });
        }
       
    });

    router.post('/claim/setHospitalClaimedByRm', async (req,res) =>{
        var filter;
        switch(req.body.tab){
            case 'claim' : filter = {$set : { rm_claimed : req.body.rmId }}; break;
            case 'dispute' : filter = {$set : { rm_claim_dispute : req.body.rmId }}; break;
            case 'release' : filter = {$set : { rm_claimed : null }}; break;
        }
       await hospitalModel.findByIdAndUpdate({_id : req.body.hospId}, filter, {new : true}).exec().then(data =>{
            if(data){
                updateRmHospitalMapping(req);
                res.send({
                    results : data
                })
            }
        });
    });

    async function updateRmHospitalMapping(request){
        var filter;
        switch(request.body.tab){
            case 'claim' : filter = {$push : { claimedHospitalId : request.body.hospId }}; break;
            case 'release' : filter = {$pull : { claimedHospitalId : request.body.hospId }}; break;
        }
        const saveRmClaimMappingDetails = new hospRmMappingModel({
            userId : request.body.rmId,
            claimedHospitalId : request.body.hospId,
        });
        hospRmMappingModel.findOneAndUpdate({userId : request.body.rmId}, filter).exec().then(data => {
            if(!data){
                saveRmClaimMappingDetails.save().then(doc=>{
                })
                .catch(err=>{
                    console.log(err)
                });
            }
        })
    }

    router.get('/claim/getAllPolicySchemes', (req,res) =>{
        var filter = [
            {
              '$match': {
                'policy': 1,
                'type': 1
              }
            }, {
              '$group': {
                '_id': '$interest_free', 
                'list': {
                  '$push': {
                    'name': '$name', 
                    'id': '$_id'
                  }
                }
              }
            }, {
              '$sort': {
                '_id': 1
              }
            }
          ]         
        schemeModel.aggregate(filter).then(policySchemesData => {
            res.send({
                results : policySchemesData
            })
        }).catch(err=>{
          console.log(err);
      });
    });

    router.get('/claim/getAllNonPolicySchemes', (req,res) =>{
        var filter = [
            {
              '$match': {
                'policy': 0,
                'type' : 1
              }
            }, {
              '$group': {
                '_id': '$interest_free', 
                'list': {
                  '$push': {
                    'name': '$name', 
                    'id': '$_id'
                  }
                }
              }
            },
             {
              '$sort': {
                '_id': 1
              }
            }
          ]         
        schemeModel.aggregate(filter).then(nonPolicySchemesData => {
            res.send({
                results : nonPolicySchemesData
            })
        }).catch(err=>{
          console.log(err)
              });
    });

    router.post('/claim/saveSchemeSelectedByRm', (req,res) =>{
      const rmSchemeMapping = rmSchemeModel({
        userId : req.body[0].userId,
        hospitalId : req.body[0].hospitalId,
        allocatedSchemes : req.body[0].selectedSchemes,
        defaultScheme : {
                          policy : req.body[0].defaultSchemes.policy,
                          nonPolicy : req.body[0].defaultSchemes.non_policy
                        },
        created_on : Date.now(),
        updated_on : Date.now()
      });
        rmSchemeMapping.save().then(doc=>{
          res.send({
            results : "Saved Successfully"
          })
        })
        .catch(err=>{
          console.log(err)
                });
    });

    router.post('/claim/updateApprovedSchemeInHospital', (req,res) =>{
      const updateDetails ={
        approvedScheme : true,
        updated_on : Date.now()
      }
      rmSchemeModel.findByIdAndUpdate({_id : req.body.schemeId}, {$set : updateDetails}, {new : true}).exec().then(data => {
       if(data){
         const updateHospitalData = {
          'scheme.policy' : data.defaultScheme.policy,
          'scheme.nonpolicy' : data.defaultScheme.nonPolicy,
          'scheme.allocation' : data.allocatedSchemes
         }
         hospitalModel.findByIdAndUpdate({_id : data.hospitalId}, {$set : updateHospitalData}, { new : true}).exec().then(hospData => {
          res.send({
            results : "Updated Hospital "
          })
         })
         .catch(err=>{
          res.json(err);
      });
       }
      })
    });

    router.post('/claim/updateHospitalClaimDispute',(req,res) =>{
      const updateClaimDetails = {
        rm_claimed : req.body.userId,
        rm_claim_dispute : null
      }
      hospitalModel.findByIdAndUpdate({ _id : req.body.hospId}, {$set : updateClaimDetails}, {new : true}).exec().then(hospData => {
        res.send({
          results : "Updated Succesfully"
        })
      }).catch(err=>{
        console.log(err)
          });
    });

module.exports = router;