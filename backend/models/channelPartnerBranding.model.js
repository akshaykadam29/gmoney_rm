var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var cpBrandingSchema = new Schema({
   branding : [{
    name: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    type:{
        type: String,
        default: 'jpg'
    }
}],
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

module.exports = mongoose.model('ChannelPartnerBranding', cpBrandingSchema);

