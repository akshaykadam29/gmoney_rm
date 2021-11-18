var mongoose = require('mongoose'),
Schema = mongoose.Schema;


var leadsSchema = new Schema({
    center: {
		type: String,
		trim: true,
		default : ''
	},
    address: {
		type: String,
		trim: true,
		default : ''
	},
    city: {
		type: String,
		trim: true,
		default : ''
	},
    contact: {
		type: String,
		trim: true,
		default : ''
	},
    mobile: {
		type: String,
		trim: true,
		default : ''
	},
    landline: {
		type: String,
		trim: true,
		default : ''
	},
	pincode : {
		type : String,
		trim : true,
		default : ''
	},
	action: {
		type: String,
		trim: true,
		default : null
	},
	status: {
		type: String,
		trim: true,
		default : null
	},
	remark: {
		type: String,
		trim: true,
		default : ''
	},
	cat: {
		type: String,
		trim: true,
		default : ''
	},
    actionDate:{
		// name : {
		// 	type : String,
		// 	default : null
		// },
		date : {
			type : Date,
			default : null
		},
		offset : {
			type : String,
			default : null
		}
	},
	history : [{
		date : {
			type : Date,
			default : null
		},
		status : {
			type : String,
			default : null
		},
		remarks : {
			type : String,
			default : null
		},
		action : {
			type: String,
			trim: true,
			default : null
		},
		actionDate : {
			date : {
				type : Date,
				default : null
			},
			offset : {
				type : String,
				default : null
			}
		}
	}],
	lead_assigned_to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'RmUser',
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
	advertise_name : {
		type: String,
		default: ''
	},
	platform_type : {
		type : String,
		default : ''
	},
	email : {
		type : String,
		default : ''
	},
	remark1: {
		type: String,
		trim: true,
		default : ''
	},
	remark2: {
		type: String,
		trim: true,
		default : ''
	},
	lead_active : {
		type : Boolean,
		default : true
	}

	
});


module.exports = mongoose.model('RmLeads', leadsSchema);