var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var assignLeadSchema = new Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'RmUser',
        default : null
    },
    leadId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'RmLeads',
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
module.exports = mongoose.model('UserLeadMapping', assignLeadSchema);