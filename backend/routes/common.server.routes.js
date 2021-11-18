'use strict';

const router = require('express').Router();
const config = require('../config/jwtHelper');
const fs = require('fs');
const AWS = require('aws-sdk');
const multiparty = require('multiparty');
const cpBrandModel = require('../models/channelPartnerBranding.model');
const hospital = require('../models/hospital.server.model');
const RmUser = require('../models/addRm.sever.model');

var filesLocation = [];
var counter = 0;

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  });

  router.post('/common/uploadFile',config.verifyToken, async(req,res) => {
    var form = new multiparty.Form();
     form.parse(req, function(err, fields, files){
       if(err){
        res.json(err);
       }else{
        for(var i =0; i<fields.count[0]; i ++){
          var singlefile = files[i];
           upload(singlefile,fields.hid[0],fields.count[0],i,fields.h_id[0])
           if(i+1==fields.count[0]){
            res.send({data :"Images Uploaded Successfully"});
           }
        } 
       }
    });
  });


  async function upload(singlefile,hid,count,index,id){
    console.log("Upload Function")
    const Buckets_Name = process.env.S3_BUCKET
    const Bucket_Name = `${Buckets_Name}/hospital_Documents/`+`${hid}`+ `/Branding`;
    fs.readFile(singlefile[0].path, (err, data) => {
      const params = {
            Bucket: Bucket_Name,
            Key: new Date().getTime()+'_'+ "brand" + `${index+1}` +'.jpg',
            Body: data
        };

      s3.upload(params, function(err, data) {
        if(err) {
          return res.status(400).send({
            message: err
          });
        }
        else{
            filesLocation.push(
              {
                name : "Brand_Image" + `${counter+1}`,
                link : `${data.Location}`
              }
            );
            counter++;
              if(counter == count){
                saveImageToS3(filesLocation,id);
              }
        }
      });
    });
  }

  function saveImageToS3(files,id){
    const cpBrand = new cpBrandModel({
      branding : files
    });
    cpBrand.save().then(doc=>{
      counter = 0;
      filesLocation=[];
      var docid = doc._id;
      if(doc){
        hospital.findByIdAndUpdate({_id : id}, {channelPartnerBranding : docid}).exec().then(data =>{
        })
        
      }
  })
  .catch(err=>{
      console.log(err);
  });
  }

  router.get('/common/getDirectReportee/:id',config.verifyToken,(req,res)=>{
    RmUser.find({ 'reportingTo' : req.params.id }).select(['name','city','locality']).exec().then(data => {
      res.status(201).json({
        results : data
    });
    })
    .catch(err=>{
      res.json(err);
  }); 
  })

module.exports = router;