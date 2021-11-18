var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var assignHospitalSchema = new Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'RmUser',
        default : null
    },
    designation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Designation',
        default : null
    },
    hospitalId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Hospital',
        default : null
    }],
    claimedHospitalId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Hospital',
        default : null
    }],
    updated_on: {
		type: Date,
		default: null
	},
	created_on: {
		type: Date,
		default: Date.now
	}
});
module.exports = mongoose.model('UserHospitalMapping', assignHospitalSchema);