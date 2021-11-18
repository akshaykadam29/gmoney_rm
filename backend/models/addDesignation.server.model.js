var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var addDesignationSchema = new Schema({
    designation : {
        type : String,
        trim : true
    },
    roleAccess :[{
        type : String,
        default : ''
    }],
    sort : {
        type : Number,
        default : null
    },
    status : {
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
module.exports = mongoose.model('Designation', addDesignationSchema);