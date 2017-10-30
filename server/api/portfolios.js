var Portfolio = require('../models/portfolio');
//var nodemailer = require('nodemailer');// for smtp
//var smtpTransport = require('nodemailer-smtp-transport');// for smtp
//var transporter = nodemailer.createTransport(smtpTransport({
//   host: 'ssl://smtp.gmail.com',
//    port: 465,
//    secure: true, // secure:true for port 465, secure:false for port 587
//    auth: {
//        user: 'futureworktechnologies4@gmail.com',
//        pass: 'rajan@host'
//    }
//}));
//  var mailOptions = {
//        from: 'futureworktechnologies4@gmail.com ', 
//        to: "ashutosh@avainfotech.com", //recipient email
//        subject: "Please confirm your E-mail address",
//        html: "Hello"
//    };

// Pages API
module.exports = function(apiRouter) {

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
    apiRouter.get('/all', function(req, res) {

        Portfolio.find({}, function(err, portfolio) {
            if (err)
                res.send(err);

            res.json(portfolio);
        });
    });
    // add a post
    apiRouter.post('/portfolios', function(req, res){
		
		var post = new Portfolio();
		post.name= req.body.name,
        post.websiteurl= req.body.websiteurl,
        post.appleurl= req.body.appleurl,
        post.googlepurl= req.body.googlepurl,
        post.image= req.body.image
        post.save(function(err, post){
            if(err) res.send(err);
                res.json(post);
            })
	});
   

//    apiRouter.post('/sendEmail', function(req, res) {
//
////        var emailData = new emailData();
////        emailData.name = req.body.name;
////        emailData.email = req.body.email;
////        emailData.phone = req.body.phone;
////        emailData.budget = req.body.budget;
////        emailData.message = req.body.message;
//        transporter.sendMail(mailOptions, function(error, info) {
//        if (error) {
//            return console.log(error);
//        }
//         console.log('Message sent: ' + info.response);  
//    });
//        post.save(function(err, post) {
//            if (err)
//                res.send(err);
//
//            res.json(post);
//        })
  //  });
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