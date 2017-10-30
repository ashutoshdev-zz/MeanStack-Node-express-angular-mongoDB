var mongoose = require('mongoose');

var careerSchema = new mongoose.Schema({
	name: { type: String, required: '{PATH} is required!'},
	email: { type: String, required: '{PATH} is required!'},  
	phone1:{ type:String,required:'{PATH} is required!' },
	phone2:{ type:String,required:'{PATH} is required!' },
	file: { type: String, required: '{PATH} is required!'},
	position: { type: String, required: '{PATH} is required!'},
	cover_letter: { type: String, required: '{PATH} is required!'},      
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

careerSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Career', careerSchema);