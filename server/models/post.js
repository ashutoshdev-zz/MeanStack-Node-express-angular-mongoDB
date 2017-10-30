var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	description: { type: String, required: '{PATH} is required!'},
        simage: { type: String, required: '{PATH} is required!'},
        himage: { type: String, required: '{PATH} is required!'},
        paramal: { type: String, required: '{PATH} is required!'},
        metadescription: { type: String, required: '{PATH} is required!'},
        metakeywords: { type: String, required: '{PATH} is required!'},  
        category: { type: String},  
        author_name: { type: String}, 
        author_image: { type: String},    
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

postSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Post', postSchema);