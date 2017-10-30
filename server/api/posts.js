var Post = require('../models/post');

// Posts API
module.exports = function(apiRouter){
	
	// get all posts
	apiRouter.get('/posts', function(req, res){
		Post.count({},function(err,count){
			console.log(count)
			Post.find({}, function(err, posts){
				if (err) res.send(err);
	
				res.json({total:count,posts:posts});
			}).skip(0).limit(10);
		});
		
	});
	
	// pagination posts
	apiRouter.get('/pagination_posts', function(req, res){
		Post.count({},function(err,count){
			//console.log(count)
			Post.find({}, function(err, posts){
				if (err){ return res.send(err); } 
				res.json({total:count,posts:posts});
			}).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit));
		});
		
	});


	// add a post
	apiRouter.post('/posts', function(req, res){
		
		var post = new Post();
		post.title = req.body.title;

                post.description = req.body.description;
                post.simage = req.body.simage;
                post.himage = req.body.himage;
                post.paramal = req.body.paramal;
                post.metadescription = req.body.metadescription;
				post.metakeywords = req.body.metakeywords;
				post.author_name = req.body.author_name;
				post.author_image = req.body.author_image;
                                post.category = req.body.category;
 	post.save(function(err, post){
			if(err) return res.send(err);

			res.json(post);
		})
	});

	// get a single post
	apiRouter.get('/posts/:id', function(req, res){
		Post.findById(req.params.id, function(err, post){
			if (err) res.send(err);

			res.json(post);
		});
	});
        // get a single post
	apiRouter.post('/parmal', function(req, res){
        
		Post.findOne({'paramal':req.body.path}, function(err, post){
			if (err) res.send(err);

			res.json(post);
		});
	});
//        

	// update a post
	apiRouter.post('/editparmal', function(req, res){
                //console.log(req.body);
		Post.findById({'_id':req.body.id}, function(err, post){
			if(err) res.send(err);
		post.title = req.body.title;
                post.description = req.body.description;
                post.simage = req.body.simage;
                post.himage = req.body.himage;
                post.paramal = req.body.paramal;
                post.metadescription = req.body.metadescription;
				post.metakeywords = req.body.metakeywords;
				
				post.author_name = req.body.author_name;
				post.author_image = req.body.author_image;
                                post.category = req.body.category;
			post.save(function(err){
				if(err) return res.send(err);
				res.json({ message: 'Post updated!' });
			})
		});
	});
	// delete a post
	apiRouter.post('/delete', function(req, res){
		Post.remove({
			_id: req.body.id
		}, function(err, post){
			if(err) res.send(err);
			res.json({ message: 'Post deleted!' });
		})
	});

	apiRouter.get('/updatepermalinks', function(req, res){
		Post.find({'paramal':/.*- .*/}, function(err, posts){
			if (err) res.send(err);
			// var permalink = posts.paramel.replace("- ","-");
			// Post.update({'_id':posts._id},{$set:{'paramel':permalink}})

			Object.keys(posts).map(function(objectKey, index) {
				var value = posts[objectKey];
				//console.log(value);
				var permalink = value.paramal.replace(/ /g,'');
				//Post.update({_id:'5996bee17851991f2ec67fa1'},{$set: { paramal: 'iphone-application-development-company-in-Ahna'}})
				// Post.update({_id:value._id},{ $set : {paramal: "'"+permalink+"'" }})
				
				 Post.findById({'_id':value._id}, function(err, post_data){
					if(err) res.send(err);
					post_data.title = value.title;
					post_data.description = value.description;
					post_data.simage = value.simage;
					post_data.himage = value.himage;
					post_data.paramal = permalink;
					post_data.metadescription = value.metadescription;
					post_data.metakeywords = value.metakeywords;
					post_data.save(function(err){
						if(err) res.send(err);
					//	res.json({ message: 'Post updated!' ,value:value});
					})
				});
				

			//  post.save(function(err){
			// 	 if(err) res.send(err);
			// 	 res.json({ message: 'Post updated!' ,value:value});
			//  })
				
				
				 //res.json({value:value,data:posts,old_paramel:value.paramal,new_one:permalink})
			});
			
			res.json(posts);
		}).limit(500);
		
	});
	// update a post remove space from permalinks
// 	apiRouter.post('/updatepermalinks', function(req, res){
// 		//console.log(req.body);
// 	Post.find({'paramal':/.*- .*/}, function(err, post){
// 	if(err) res.send(err);
// 	res.json(post);
// }).limit(5);
// });
};