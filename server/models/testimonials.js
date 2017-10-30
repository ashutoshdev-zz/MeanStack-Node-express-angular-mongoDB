var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	name: { type: String, required: '{PATH} is required!'},
	image: { type: String, required: '{PATH} is required!'},
	description: { type: String, required: '{PATH} is required!'},    
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

postSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Testimonial', postSchema);