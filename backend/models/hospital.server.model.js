'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  jwt = require('jsonwebtoken');
/**
 * Hospital Schema
 */
var HospitalSchema = new Schema({
  hid: {
    type: String,
    default: ''
    // unique: true,
  },
  name: {
    type: String,
    trim: true
  },
  mobile: {
    type: Number,
    required: 'Please provide mobile No.'
  },
  mobile_verified: {
    type: Boolean,
    default: false
  },
  state: {
    type: String,
    default: ''
    //  required: 'Please provide State',
  },
  city: {
    type: String,
    default: ''
  },
  Locality: {
    type: String,
    default: ''
  },
  pincode: {
    type: Number,
    default: 0
  },
  address: {
    type: String,
    default: ''
  },
  ownership: {
    type: String,
    default: ''
  },
  beds: {
    type: Number,
    default: 0
  },
  branches: {
    type: Number,
    default: 0
  },
  entity: {
    type: String,
    default: '',
    trim: true
  },
  type: {
    type: String,
    default: '',
    trim: true
  },
  rohini_id: {
    type: String,
    default: '',
    trim: true
  },
  dedupe_pass: {
    type: Boolean,
    default: false
  },
  dedupe_reason: {
    type: String,
    default: ''
  },
  hospital_blacklist: {
    type: Boolean,
    default: false
  },
  blacklist_reason: {
    type: String,
    default: ''
  },
  is_disabled: {
    type: Boolean,
    default: false
  },
  remarks: {
    type: String,
    default: ''
  },
  term_condition_check: {
    type: Boolean,
    default: false
  },
  application_details: {
    reference_id: {
      type: String,
      default: ''
    },
    capture_expires_at: {
      type: String,
      default: ''
    },
    profile_id: {
      type: String,
      default: ''
    },
    capture_link: {
      type: String,
      default: ''
    },
    last_updated_date: {
      type: Date
    }
  },
  directors: [{
    name: {
      type: String,
      default: '',
      trim: true
    },
    contactNumber: {
      type: String,
      default: '',
      trim: true
    },
    mobile_verified: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      default: ''
    },
    designation: {
      type: String,
      default: ''
    },
    authorized_signatory: {
      type: Boolean,
      default: false
    },
    agreement_signed: {
      type: Boolean,
      default: false
    },
    agreement_signed_on: {
      type: Date
    },
    agreement_signed_type: {
      type: String,
      default: ''
    }
  }],
  contact_persons: [{
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
    mobile_verified: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      default: ''
    },
    designation: {
      type: String,
      default: ''
    },
    same_check: {
      type: Boolean,
      default: false
    }
  }],
  hospital_pan_details: {
    name: {
      type: String,
      default: ''
    },
    pan_entered: {
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
    }
  },
  authorised_pan_details: {
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
    }
  },
  agreement_details: {
    agreement_signed: {
      type: Boolean,
      default: false
    },
    agreement_link: {
      type: String,
      default: ''
    },
    agreement_audit: {
      type: String,
      default: ''
    },
    agreement_sent: {
      type: Boolean,
      default: false
    },
    agreement_generated: {
      type: Boolean,
      default: false
    },
    agreement_id: {
      type: String,
      default: ''
    },
    agreement_status: {
      type: String,
      default: ''
    },
    agreement_irn: {
      type: String,
      default: ''
    },
    agreement_signed_date: {
      type: Date,
      default: null
    },
    signed_details: {
      verification: {
        gender: {
          type: String,
          default: ''
        },
        yob: {
          type: String,
          default: ''
        },
        smartName: {
          type: String,
          default: ''
        }
      },
      signer: {
        gender: {
          type: String,
          default: ''
        },
        name: {
          type: String,
          default: ''
        },
        yob: {
          type: String,
          default: ''
        }
      }
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
  scheme: {
    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
      default: null
    },
    nonpolicy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
      default: null
    },
    allocation: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
      default: null
    }]
  },
  app_status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AppStatus'
  },
  rm_assigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RmUser',
    default: null
  },
  channelPartnerBranding: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChannelPartnerBranding',
    default: null
  },
  updated_on: {
    type: Date,
    default: null
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  started_on: {
    type: Date,
    default: Date.now
  },
  branch_type: {
    type: Number,
    default: 1 /* 1 HO 2 Branch 3 Franchise */
  },
  skip_otp: {
    type: Boolean,
    default: false
  },
  parent_hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    default: null
  },
  channel_partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChannelPartner',
    default: null
  },
  rm_claimed : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'RmUser',
		default : null
	},
	rm_claim_dispute : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'RmUser',
		default : null
	}
}, 
{
usePushEach: true
});
HospitalSchema.index({
  hid: 1
}, {
  'unique': true,
  'partialFilterExpression': {
    'hid': {
      '$gt': ''
    }
  }
});
HospitalSchema.index({
  parent_hospital: 1
});
// HospitalSchema.methods.generateJwt = function () {
//   return jwt.sign({
//     _id: this._id,
//     hid: this.hid,
//     name: this.name
//     }, 'GMONEY_CHECK', { expiresIn: '1h' });
// };
module.exports = mongoose.model('Hospital', HospitalSchema);
