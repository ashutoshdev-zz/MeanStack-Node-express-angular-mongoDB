var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	email: {
		type: String, 
		required: '{PATH} is required!'
	},
	firstname:{type:String, required:'{PATH} is required!'},
	lastname:{type:String, required:'{PATH} is required!'},
//	password:{type:String, required:'{PATH} is required!'},
	dob:{type:String,required:'{PATH} is required!'},
	role:{type:String,required:'{PATH} is required!'},
	status:{type:Boolean,required:'{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field
User.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', User);