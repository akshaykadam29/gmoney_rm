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
var ApplicationSchema = new Schema({
  application_id: {
    type: String,
    default: ''
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    default: null
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    default: null
  },
  address: {
    proof_type: {
      type: String,
      default: ''
    },
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
      default: 0
    },
    same_as_aadhar: {
      type: Boolean,
      default: false
    },
    name_match: {
      type: Boolean,
      default: false
    },
    negative_pincode: {
      type: Boolean,
      default: false
    },
    pincode_detected: {}
  },
  employment: {
    type: {
      type: String,
      default: 'salaried'
    },
    /* Salaried,Self Employed*/
    company_name: {
      type: String,
      default: ''
    },
    company_category: {
      type: String,
      default: ''
    },
    address: {
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
      }
    },
    net_income: {
      type: Number,
      default: 0
    }

  },
  statment_password: {
    type: String,
    default: ''
  },
  financial_data: [{
    month: {
      type: String
    },
    salary_credit: {
      type: Number
    },
    credit_date: {
      type: String
    },
    emi_1: {
      type: Number,
      default: 0
    },
    emi_2: {
      type: Number,
      default: 0
    },
    emi_3: {
      type: Number,
      default: 0
    },
    emi_4: {
      type: Number,
      default: 0
    },
    emi_5: {
      type: Number,
      default: 0
    },
    emi_6: {
      type: Number,
      default: 0
    },
    bounces: {
      type: Number,
      default: 0
    },
    balance_10: {
      type: Number,
      default: 0
    },
    balance_20: {
      type: Number,
      default: 0
    },
    balance_30: {
      type: Number,
      default: 0
    },
    salary_gross: {
      type: Number,
      default: 0
    },
    net_income: {
      type: Number,
      default: 0
    },
    added_on: {
      type: Date,
      default: Date.now
    }
  }],
  financial_data_summary: {},
  policy: {
    policy_holder: {
      type: Boolean,
      default: false
    },
    claimed: {
      type: Boolean,
      default: false
    },
    relation: {
      type: String,
      default: ''
    },
    patient_name: {
      type: String,
      default: ''
    },
    company_name: {
      type: String,
      default: ''
    },
    policy_amount: {
      type: Number,
      default: 0
    },
    cases_no: {
      type: Number,
      default: 0
    },
    cases_rejected: {
      type: Number,
      default: 0
    },
    cases_fraud: {
      type: Number,
      default: 0
    },
    documents_link: [{
      name: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: ''
      }
    }]
  },
  loan: {
    request_amount: {
      type: Number,
      default: 0
    },
    hospital_estimate: {
      type: Number,
      default: 0
    },
    hospital_estimate_validation: {
      type: Boolean,
      default: false
    },
    procedure_name: {
      type: String,
      default: ''
    },
    subvention: {
      type: Number,
      default: 0
    },
    platform_fee: {
      type: Number,
      default: 0
    },
    gst: {
      type: Number,
      default: 0
    },
    payable: {
      type: Number,
      default: 0
    },
    emi: {
      type: Number,
      default: 0
    },
    adv_emi: {
      type: Number,
      default: 0
    },
    transfer_amount: {
      type: Number,
      default: 0
    },
    transection_id: {
      type: String,
      default: ''
    },
    admission_id: {
      type: String,
      default: ''
    },
    admission_date: {
      type: Date,
      default: null
    },
    discharge_link: {
      type: String,
      default: ''
    },
    loan_actions: {
      videokyc: {
        reference_id: {
          type: String,
          default: ''
        },
        status: {
          type: String,
          default: '' /* Approved / Rejected / Hold*/
        },
        link: {
          type: String,
          default: ''
        }
      },
      agreement: {
        sent: {
          type: Boolean,
          default: false
        },
        sent_date: {
          type: Date,
          default: null
        },
        link: {
          type: String,
          default: ''
        },
        audit_trail: {
          type: String,
          default: ''
        },
        fully_signed: {
          type: Boolean,
          default: false
        },
        sign_customer_at: {
          type: Date,
          default: null
        },
        sign_by_customer: {
          type: Boolean,
          default: false
        },
        sign_lender_at: {
          type: Date,
          default: null
        },
        sign_by_lender: {
          type: Boolean,
          default: false
        },
        docid: {
          type: String,
          default: ''
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
      undertaking: {
        generated: {
          type: Boolean,
          default: false
        },
        uploaded: {
          type: Boolean,
          default: false
        },
        uploaded_at: {
          type: Date,
          default: null
        },
        link: {
          type: String,
          default: ''
        },
        link_new: {
          type: String,
          default: ''
        },
        checked: {
          type: Boolean,
          default: false
        }
      },
      adv_emi_collected: {
        type: Boolean,
        default: false
      },
      enach: {
        created: {
          type: Boolean,
          default: false
        },
        mandate: {
          type: Boolean,
          default: false
        },
        subscription_id: {
          type: String,
          default: ''
        },
        subscription_ref: {
          type: String,
          default: ''
        },
        max_mandate: {
          type: Number,
          default: 0
        },
        mandate_expires: {
          type: Date,
          default: null
        }
      }
    },
    no_cost_emi: {
      type: Boolean,
      default: false
    },
     advance_against_mediclaim: {
       type: Boolean,
       default: false
     }
  },
  credit_score: {
    score: {
      type: String,
      default: '0'
    },
    address_match: {
      type: Boolean,
      default: false
    },
    mobile_match: {
      type: Boolean,
      default: false
    },
    name_match: {
      type: Boolean,
      default: false
    },
    data: {},
    raw_data: {
      type: String,
      default: ''
    }
  },
  risk_entry: {
    credit_score: {
      type: Number,
      default: 0
    },
    no_of_dpd: {
      type: Number,
      default: 0
    },
    ovedue_amount: {
      type: Number,
      default: 0
    },
    current_balance: {
      type: Number,
      default: 0
    },
    loans: {
      type: Number,
      default: 0
    },
    loan_open_date: {
      type: String,
      default: ''
    },
    emi_count: {
      type: Number,
      default: 0
    },
    cc_outstanding: {
      type: Number,
      default: 0
    },
    cc_payment: {
      type: Number,
      default: 0
    },
    emi_value: {
      type: Number,
      default: 0
    },
    emi_amount: {
      type: Number,
      default: 0
    },
    reviced_emi_amount: {
      type: Number,
      default: 0
    },
    case_category: {
      type: String,
      default: ''
    },
    enach_check: {
      type: Boolean,
      default: false
    },
    scheme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme'
    },
    scheme_change: {
      type: Boolean,
      default: false
    },
    last_30: {
      type: Number,
      default: 0
    },
    last_60: {
      type: Number,
      default: 0
    },
    updated_on: {
      type: Date,
      default: Date.now
    }
  },
  app_status: {
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ApplicationStatus',
      default: null
    },
    remarks: {
      type: String,
      default: ''
    },
    ops1: {
      remarks: {
        type: String,
        default: ''
      },
      updated_on: {
        type: Date,
        default: Date.now
      }
    },
    ops2: {
      remarks: {
        type: String,
        default: ''
      },
      updated_on: {
        type: Date,
        default: Date.now
      }
    },
    risk1: {
      remarks: {
        type: String,
        default: ''
      },
      updated_on: {
        type: Date,
        default: Date.now
      }
    },
    risk2: {
      remarks: {
        type: String,
        default: ''
      },
      updated_on: {
        type: Date,
        default: Date.now
      }
    },
    cam: {
      generated: {
        type: Boolean,
        default: false
      },
      published: {
        type: Boolean,
        default: false
      }
    },
    offer: {
      published: {
        type: Boolean,
        default: false
      },
      accepted: {
        type: Boolean,
        default: false
      },
      disbursed: {
        type: Boolean,
        default: false
      }
    }
  },
  offer: {
    // lender: {
    //   type: String,
    //   default: ''
    // },

    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lender',
      default: null
    },
    offer_date: {
      type: Date
    },
    sanction_amount: {
      type: Number,
      default: 0
    },
    int_free_period: {
      type: Number,
      default: 0
    },
    /* Days / Months */
    int_free_period_name: {
      type: String,
      default: 'Days'
    },
    advance_emi: {
      type: Number,
      default: 0
    },
    emi_start: {
      type: Date
    },
    process_fee: {
      type: Number,
      default: 0
    },
    other_charges: {
      type: Number,
      default: 0
    },
    gst: {
      type: Number,
      default: 0
    },
    disbursal_amount: {
      type: Number,
      default: 0
    },
    tenure_months: {
      type: Number,
      default: 0
    },
    roi: {
      type: Number,
      default: 0
    },
    interest: {
      type: Number,
      default: 0
    },
    emi: {
      type: Number,
      default: 0
    },
    created_on: {
      type: Date,
      default: Date.now
    },
    published: {
      type: Boolean,
      default: false
    },
    published_on: {
      type: Date,
      default: null
    },
    accepted: {
      type: Boolean,
      default: false
    },
    accepted_on: {
      type: Date,
      default: null
    },
    scheme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
      default: null
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
  reject_remarks: {
    low_income: {
      type: Boolean,
      default: false
    },
    low_cibil: {
      type: Boolean,
      default: false
    },
    overleveraged: {
      type: Boolean,
      default: false
    },
    negative_pincode: {
      type: Boolean,
      default: false
    },
    abb_below_emi: {
      type: Boolean,
      default: false
    },
    fraud_match: {
      type: Boolean,
      default: false
    },
    bounce: {
      type: Boolean,
      default: false
    },
    aigo: {
      type: Boolean,
      default: false
    },
    others: {
      type: Boolean,
      default: false
    }
  },
  updated_on: {
    type: Date,
    default: null
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});
ApplicationSchema.index({
  customer: 1
});
ApplicationSchema.index({
  hospital: 1
});
ApplicationSchema.index({
  application_id: 1
}, {
  'unique': true,
  'partialFilterExpression': {
    application_id: {
      '$gt': ''
    }
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
