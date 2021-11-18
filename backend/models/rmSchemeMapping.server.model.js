'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var rmSchemeMappingSchema = new Schema({

    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RmUser',
        default: null
      },
    hospitalId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        default: null
    },
    allocatedSchemes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scheme',
            default: null
        }
    ],
    defaultScheme : {
        policy : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scheme',
            default: null
        },
        nonPolicy : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scheme',
            default: null
        }
    },
    approvedScheme : {
        type : Boolean,
        default : false
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

  module.exports = mongoose.model('RmSchemeMapping', rmSchemeMappingSchema);