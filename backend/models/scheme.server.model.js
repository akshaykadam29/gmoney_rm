'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  // path = require('path'),
  // config = require(path.resolve('./config/config')),
  Schema = mongoose.Schema;

/**
 * Entity Schema
 */
var SchemeSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true
  },
  total: {
    type: Number,
    default: 0
  },
  policy:{
    type: Number,
    default: 1
		/*0 for Non Policy and 1 for Policy Holder*/
  },
  subvention:{
    type: Number,
    default: 0
  },
  platform_fee:{
    type: Number,
    default: 0
  },
  advance_emi:{
    type: Number,
    default: 0
  },
  emi_count:{
    type: Number,
    default: 0
  },
  interest_free:{
    type: Number,
    default: 0
  },
  period:{
    type: String,
    default: ''
  },
  desc:{
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: true
  },
});
module.exports =mongoose.model('Scheme', SchemeSchema);
