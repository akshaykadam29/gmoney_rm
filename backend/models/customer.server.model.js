'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
 	jwt = require('jsonwebtoken');


/**
 * Customer Schema
 unique : true, required : true, dropDups: true
 */
var CustomerSchema = new Schema({
	customer_id: {
		type: String,
		default: '',
	},
	customer_onboard_status: {
		type: String,
		default: ''
	},
	customer_onboard_stage: {
		type: String,
		default: ''
	},
	mobile: {
		type: Number,
		//unique: true,
		required: true,
		default:0
	},
	mobile_verified: {
		type: Boolean,
		default: false
	},
	email_id: {
		type: String,
		default: ''
	},
	email_verified: {
		type: Boolean,
		default: false
	},
	identity: {
		name: {
			type: String,
			default: ''
		},
		dob: {
			type: Date
		},
		father_name: {
			type: String,
			default: ''
		},
		gender: {
			type: String,
			default: ''
		},
		name_as_per_pan: {
			full_name: {
				type: String,
				default: ''
			},
			dob: {
				type: Date
			},
			father_name: {
				type: String,
				default: ''
			},
		},
		name_as_per_aadhar: {
			full_name: {
				type: String,
				default: ''
			},
			dob: {
				type: Date
			},
			father_name: {
				type: String,
				default: ''
			},
		},
		selfie: {
			link: {
				type: String,
				default: ''
			},
			geolocation: {
				latitude: {
					type: String,
					default: ''
				},
				longitude: {
					type: String,
					default: ''
				},
				address: {
					type: String,
					default: ''
				},
				pincode: {
					type: Number,
					default: '0'
				},
			},
			liveliness: {
				type: Boolean,
				default: false
			},
			name_match: {
				type: Boolean,
				default: false
			},
			face_match: {
				type: Boolean,
				default: false
			}
		},
		poa_details: {
			aadhar_details: {
				address: {
					type: String,
					default: ''
				},
				city: {
					type: String,
					default: ''
				},
				pincode: {
					type: Number,
					default: ''
				},
				dob: {
					type: String,
					default: ''
				},
				gender: {
					type: String,
					default: ''
				},
				name: {
					type: String,
					default: ''
				},
				photo_link: {
					type: String,
					default: ''
				},
				dob_year: {
					type: Number,
					default: '0'
				},
				is_aadhar_verified: {
					type: Boolean,
					default: false
				},
			},
			current_address_details: {
				address: {
					type: String,
					default: ''
				},
				city: {
					type: String,
					default: ''
				},
				pincode: {
					type: Number,
					default: ''
				},
				address_type: {
					type: String,
					default: ''
				},
				address_link: {
					type: String,
					default: ''
				},
				address_verified: {
					type: Boolean,
					default: false
				},
				same_as_aadhar:{
					type: Boolean,
					default: false
				}
			},
			pan_details: {
				pan_entered: {
					type: String,
					default: ''
				},
				name: {
					type: String,
					default: ''
				},
				dob: {
					type: String,
					default: ''
				},
				father_name: {
					type: String,
					default: ''
				},
				pan_type: {
					type: String,
					default: ''
				},
				is_pan_verified: {
					type: Boolean,
					default: false
				},
				pan_link: {
					type: String,
					default: ''
				},
			},
			is_pincode_match: {
				type: Boolean,
				default: false
			},
			/*aadhar/current*/
			is_pincode_negative: {
				type: Boolean,
				default: false
			}
		},
		bank_details: {
			account_no:{type:String,default:''},
			account_name:{type:String,default:''},
			//ifsc_code:{type:String,default:''},
			ifsc:{type:String,default:''},
			bank_verified:{type:Boolean,default:false}
			},
		// applications: [{
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Application'
		// }],
		dedupe_pass: {
			type: Boolean,
			default: false
		},
		dedupe_reason: {
			type: String,
			default: ''
		},
		customer_blacklist: {
			type: Boolean,
			default: false
		},
		customer_blacklist_reason: {
			type: String,
			default: ''
		},
		i_authorize: {
			type: Boolean,
			default: false
		},
		i_agree: {
			type: Boolean,
			default: false
		},
		video_link: {
			type: String,
			default: ''
		},
		is_disabled: {
			type: Boolean,
			default: false
		},
		onboarding_link: {
			type: String,
			default: ''
		},
		reference_id: {
			type: String,
			default: ''
		},
		profile_id: {
			type: String,
			default: ''
		},
		created_on: {
			type: Date,
			default: Date.now
		}
	}
});

CustomerSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);

  return jwt.sign({
    _id: this._id,
   exp: parseInt(expiry.getTime() / 1000),
  }, "GMONEY_CHECK");
};

module.exports = mongoose.model('Customer', CustomerSchema);
