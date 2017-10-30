var mongoose = require('mongoose');

var languageSchema = new mongoose.Schema({
	alldata: { type: String, required: '{PATH} is required!'},
	role: { type: String, required: '{PATH} is required!'},
    	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

languageSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Language', languageSchema);