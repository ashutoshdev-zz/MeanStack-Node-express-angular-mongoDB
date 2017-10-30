var Page = require('../models/page');

// Pages API
module.exports = function(apiRouter){
	
	// get all pages
//	apiRouter.get('/pages', function(req, res){
//		Page.find({}, function(err, pages){
//			if (err) res.send(err);
//
//			res.json(posts);
//		});
//	});
//        
//
//
//	// add a post
//	apiRouter.post('/pages', function(req, res){
//		
//		var pages = new Page();
//		post.title = req.body.title;
//                post.description = req.body.description;
//                post.simage = req.body.simage;
//                post.himage = req.body.himage;
//                post.paramal = req.body.paramal;
//                post.metadescription = req.body.metadescription;
//                post.metakeywords = req.body.metakeywords;
// 	post.save(function(err, post){
//			if(err) res.send(err);
//
//			res.json(post);
//		})
//	});
//
//	// get a single post
//	apiRouter.get('/pages/:id', function(req, res){
//		Post.findById(req.params.id, function(err, post){
//			if (err) res.send(err);
//
//			res.json(post);
//		});
//	});
        // get a single post
	apiRouter.get('/singlepost', function(req, res){
        
		Page.findOne({'role':'singleportfolio'}, function(err, page){
			if (err) res.send(err);

			res.json(page);
		});
	});
//        

	// update a post
//	apiRouter.put('/posts/:id', function(req, res){
//		Post.findById(req.params.id, function(err, post){
//			if(err) res.send(err);
//
//			post.title = req.body.title;
//			post.description = req.body.body;
//
//			post.save(function(err){
//				if(err) res.send(err);
//
//				res.json({ message: 'Post updated!' });
//			})
//		});
//	});
//
//	// delete a post
//	apiRouter.delete('/posts/:id', function(req, res){
//		Post.remove({
//			_id: req.params.id
//		}, function(err, post){
//			if(err) res.send(err);
//
//			res.json({ message: 'Post deleted!' });
//		})
//	});
};