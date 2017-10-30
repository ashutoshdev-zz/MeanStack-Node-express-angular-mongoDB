var Contact = require('../models/contacts');

// Posts API
module.exports = function(apiRouter){
	// get all posts
	apiRouter.get('/contacts', function(req, res){
		Contact.find({}, function(err, posts){
			if (err) res.send(err);
			res.json(posts);
		});
	});


	// add a post
	apiRouter.post('/contacts_add', function(req, res){
		console.log('simer')
		console.log(req.body)
		var post = new Contact();
		post.name = req.body.name;
		post.email = req.body.email;
        post.phone = req.body.phone;
        post.budget = req.body.budget;
		post.message = req.body.message;
 		post.save(function(err, post){
			if(err) res.send(err);
				res.json(post);
			})
	});

	// get a single post
	apiRouter.get('/posts/:id', function(req, res){
		Contact.findById(req.params.id, function(err, post){
			if (err) res.send(err);

			res.json(post);
		});
	});
        // get a single post
	apiRouter.post('/parmal_cat', function(req, res){
        console.log(req.body.path)
		Contact.findOne({'_id':req.body.path}, function(err, post){
			if (err) return res.send(err);
console.log(post)
			res.json(post);
		});
	});
//        

	// update a post
	apiRouter.post('/editparmal', function(req, res){
                //console.log(req.body);
		Contact.findById({'_id':req.body.id}, function(err, post){
			if(err) res.send(err);
		post.title = req.body.title;
                post.description = req.body.description;
                post.simage = req.body.simage;
                post.himage = req.body.himage;
                post.paramal = req.body.paramal;
                post.metadescription = req.body.metadescription;
                post.metakeywords = req.body.metakeywords;
			post.save(function(err){
				if(err) res.send(err);
				res.json({ message: 'Post updated!' });
			})
		});
	});
	// delete a post
	apiRouter.post('/deletecontact', function(req, res){
		Contact.remove({
			_id: req.body.id
		}, function(err, post){
			if(err) res.send(err);
			res.json({ message: 'Post deleted!' });
		})
	});
};