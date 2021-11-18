'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Hospital Schema
 */
var ApplicationStatusSchema = new Schema({
   title:{ type:String,default:''},
   value:{ type:Number}, /*Incremental*/
   role:{ type:Number}, /*OPS1 1, OPS2 2, RISK1 3, RISK2 4*/
   status:{ type:Boolean, default:true},
   extstatus:{ type:String, default:''}
});

module.exports =mongoose.model('ApplicationStatus', ApplicationStatusSchema);
