'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Appliation Schema
 unique : true, required : true, dropDups: true
 */
var channelPartnerSchema = new Schema({
  mobile: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  imglink: {
    type: String,
    default: ''
  },
  short_name: {
    type: String,
    default: '',
    unique: true
  },
  entitytype: {
    type: String,
    default: ''
  },
  authroized_persons: {
    name: {
      type: String,
      default: '',
      trim: true
    },
    contactNumber: {
      type: String,
      default: '',
      trim: true
      /* unique:true*/
    },
    email: {
      type: String,
      default: ''
    },
    designation: {
      type: String,
      default: ''
    }
  },
  bank_details: {
    ifsc: {
      type: String,
      default: ''
    },
    account_no: {
      type: String,
      default: ''
    },

    bank_verified: {
      type: Boolean,
      default: false
    },
    bank_name: {
      type: String,
      default: ''
    },
    cheque_link: {
      type: String,
      default: ''
    }
  },
  documents_link: [{
    name: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'jpg'
    }
  }],
  status: {
    type: Boolean,
    default: true
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_on: {
    type: Date,
    default: null
  }
});
channelPartnerSchema.index({
  short_name: 1
});
mongoose.model('ChannelPartner', channelPartnerSchema);
