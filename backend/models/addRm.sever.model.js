var mongoose = require('mongoose'),
Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

var RmUserSchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	mobile: {
		type: Number,
        default : null
	},
	email: {
        type: String,
        default: ''
    },
    region : {
        type : String,
        default : ''
    },
    state : {
        type : String,
        default : ''
    },
    city : {
        type : String,
        default : ''
    },
    locality : {
        type : String,
        default : ''
    },
    pincode : {
        type : Number,
        default : null
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation',
        default: null
      },
    password : {
        type : String,
        default : ''
    },
    saltSecret : String,
    reportingTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'RmUser',
        default : null
    },
    multipleReporting : {
        type : Boolean,
        default : false
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

RmUserSchema.pre('save', function(next) {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(this.password, salt, (err,hash) => {
            this.password = hash;
            this.saltSecret= salt;
            next();
        });
    });
});

// Methods
RmUserSchema.methods.verifyPassword = function (password) {
    return bcryptjs.compareSync(password,this.password);
};

RmUserSchema.methods.generateJwt = function () {
    return jwt.sign({ _id : this._id},
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_EXP
        });
}


module.exports = mongoose.model('RmUser', RmUserSchema);

