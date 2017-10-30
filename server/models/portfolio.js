var mongoose = require('mongoose');

var portfolioSchema = new mongoose.Schema({
	name: { type: String,required: '{PATH} is required!'},
        image: { type: String, required: '{PATH} is required!'},
        websiteurl: { type: String},
        appleurl: { type: String},        
        googlepurl: { type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

portfolioSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);