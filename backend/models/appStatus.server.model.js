

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Hospital Schema
 */
var AddStatusSchema = new Schema({
   title:{ type:String,default:''},
   value:{ type:Number},
   status:{ type:Boolean, default:true}
});

module.exports = mongoose.model('AppStatus', AddStatusSchema);
