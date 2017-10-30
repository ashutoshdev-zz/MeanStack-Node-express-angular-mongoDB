var express = require('express'),
        path = require('path'),
        User = require('./models/user'),
        Post = require('./models/post'),
        Page = require('./models/page'),
        Portfolio = require('./models/portfolio'),
        Category = require('./models/categories'),
        Client = require('./models/clients'),
        Testimonial = require('./models/testimonials'),
        Contact = require('./models/contacts'),
        Career = require('./models/careers'),
        Language = require('./models/language'),
        serialize = require('node-serialize'),
    // nodemailer modules
       nodemailer = require('nodemailer');
       transporter = nodemailer.createTransport();
    // ends here

        aws = require('aws-sdk'),
        multer = require('multer'),
        multerS3 = require('multer-s3'),
        dateNow = Date.now(),

        rootPath = path.normalize(__dirname + '/../'),
        apiRouter = express.Router(),
        sm = require('sitemap'),
        router = express.Router();



        aws.config.update({
    secretAccessKey: 'Ao23anw19ZeQxmgRgcqTaJormkUG6JAMonGSojlCWfLR',
    accessKeyId: 'AKIAJEURDDP6IBXERIEQ'
});

var s3 = new aws.S3({endpoint: 'https://s3.eu-central-1.amazonaws.com',
    region: 'eu-central-1',
    signatureVersion: 'v4',
    ACL: 'public-read'
});
var transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    auth: {
        user: "AKIAJT5VPNNZ4WJJWPCA",
        pass: "AkM07wRGIz86hODt91zcmwcnkOCVLBu2tTN0rOj83yRJ"
    }
});
var mailOptions = {
    from: 'honey@avainfotech.com',
    to: 'ashutosh@avainfotech.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'slugimage',
        key: function(req, file, cb) {
            //console.log(file);
            var flname = file.originalname;
            cb(null, 'blogimage/' + dateNow + '' + flname); //use Date.now() for unique file keys
        }
    })
});

module.exports = function(app, passport) {
    app.use('/api', apiRouter);
    app.use('/', router);
    // API routes
    require('./api/posts')(apiRouter);
    require('./api/pages')(apiRouter);
    require('./api/portfolios')(apiRouter);
    require('./api/users')(apiRouter);
    require('./api/categories')(apiRouter);
    require('./api/clients')(apiRouter);
    require('./api/contacts')(apiRouter);
    require('./api/testimonials')(apiRouter);
    require('./api/careers')(apiRouter,upload,serialize,Language);
    // home route
    router.get('/', function(req, res) {
        res.render('index');
    });
//    router.get('/ar', function(req, res) {
//        res.render('index');
//    });
     router.get('/de', function(req, res) {
        res.render('index_de');
    });
    router.get('/ar', function(req, res) {
        res.render('index_ar');
    });
     router.get('/nl', function(req, res) {
        res.render('index_nl');
    });
     router.get('/zh', function(req, res) {
        res.render('index_zh');
    });
     router.get('/fr', function(req, res) {
        res.render('index_fr');
    });
     router.get('/ja', function(req, res) {
        res.render('index_ja');
    });
     router.get('/es', function(req, res) {
        res.render('index_es');
    });
     router.get('/nn', function(req, res) {
        res.render('index_nn');
    });
     router.get('/pt', function(req, res) {
        res.render('index_pt');
    });
    // admin route
    router.get('/admin', function(req, res) {
        res.render('admin/login');
    });
    // router.get('/admin/register', function(req, res) {
    //     res.render('admin/register');
    // });
    router.get('/admin/dashboard', isAdmin, function(req, res) {
        res.render('admin/dashboard', {user: req.user});
    });
    router.post('/register', function(req, res) {
        // passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
        User.register(new User({
            email: req.body.email
        }), req.body.password, function(err, user) {
            if (err) {
                console.error(err);
                return;
            }
            // log the user in after it is created
            passport.authenticate('local')(req, res, function() {
                console.log('authenticated by passport');
                res.redirect('/admin/dashboard');
            });
        });
    });
    router.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/admin/dashboard');
    });
     ///sitemap
    router.get('/sitemap.xml', function(req, res) {
        Post.find({}, 'paramal', function(err, mongourls)
        {
            //console.log(mongourls);
            var pageUrls=[];
            if (mongourls) {
                for (var i = 0; i < 2; i++) {
                    var obj = {url: "/" + mongourls[i].paramal, changefreq: 'daily', priority: 0.9};
                    
                    pageUrls.push(obj);
                }
            }
            var sitemap = sm.createSitemap({
                hostname: 'https://futureworktechnologies.com',
                cacheTime: 600000, // 600 sec - cache purge period 
                urls: pageUrls
            });
            sitemap.toXML(function(err, xml) {
                if (err) {
                    return res.status(500).end();
                }
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            });
        });
    });
    
     router.get('/sitemap1.xml', function(req, res) {
        Post.find({}, 'paramal', function(err, mongourls)
        {
            //console.log(mongourls);
            var pageUrls=[];
            if (mongourls) {
                for (var i = 0; i < mongourls.length; i++) {
                    var obj = {url: "/" + mongourls[i].paramal, changefreq: 'daily', priority: 0.9};
                    
                    pageUrls.push(obj);
                }
            }
            var sitemap = sm.createSitemap({
                hostname: 'https://futureworktechnologies.com',
                cacheTime: 600000, // 600 sec - cache purge period 
                urls: pageUrls
            });
            sitemap.toXML(function(err, xml) {
                if (err) {
                    return res.status(500).end();
                }
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            });
        });
    });
     router.get('/sendemail', function(req, res) {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
    
      router.get('/about',function(req, res) {
        res.render('home/about');
    });
    
    
      
    
     router.get('/contact',function(req, res) {


        // Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
//nodemailer.createTestAccount((err, account) => {
    
        // create reusable transporter object using the default SMTP transport
        // let transporter = nodemailer.createTransport({
        //     host: 'smtp.ethereal.email',
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: account.user, // generated ethereal user
        //         pass: account.pass  // generated ethereal password
        //     }
        // });
        // let transporter = nodemailer.createTransport({
        //     host: 'email-smtp.eu-west-1.amazonaws.com',
        //     port: 587,
        //     secure: false, // upgrade later with STARTTLS
        //     auth: {
        //         user: 'AKIAJRZZS6WH7BZOBIMA',
        //         pass: 'AqACIIcfGwHLQr+fzT2kbayinQdjmQgZgoWtMdvOkE5t'
        //     }
        // });
        
        // let smtpConfig = {
        //     host: 'email-smtp.eu-west-1.amazonaws.com',
        //     port: 587,
        //     secure: false, // upgrade later with STARTTLS
        //     auth: {
        //         user: 'AKIAJRZZS6WH7BZOBIMA',
        //         pass: 'AqACIIcfGwHLQr+fzT2kbayinQdjmQgZgoWtMdvOkE5t'
        //     }
        // };
    
        // setup email data with unicode symbols
        // let mailOptions = {
        //     from: '"simerjit@avainfotech.com', // sender address
        //     to: 'anurag@avainfotech.com, ashutosh@avainfotech.com', // list of receivers
        //     subject: 'Hello ✔', // Subject line
        //     text: 'Hello world?', // plain text body
        //     html: '<b>Hello world?</b>' // html body
        // };
    
        // // send mail with defined transport object
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return console.log(error);
        //     }
        //     console.log('Message sent: %s', info.messageId);
        //     // Preview only available when sending through an Ethereal account
        //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
        //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        //     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        // });
    //});



        // let smtpConfig = {
        //     host: 'email-smtp.eu-west-1.amazonaws.com',
        //     port: 587,
        //     secure: false, // upgrade later with STARTTLS
        //     auth: {
        //         user: 'AKIAJRZZS6WH7BZOBIMA',
        //         pass: 'AqACIIcfGwHLQr+fzT2kbayinQdjmQgZgoWtMdvOkE5t'
        //     }
        // };
        // transporter.verify(function(error, success) {
        //     if (error) {
        //          console.log(error);
        //     } else {
        //          console.log('Server is ready to take our messages');
        //     }
        //  });

        // var output = transporter.sendMail({
        //     from: 'anurag@avainfotech.com',
        //     to: 'simerjit@avainfotech.com',
        //     subject: 'Message from Anurag',
        //     text: 'Test mail from nodejs'
        // });
        // console.log(output)
        // console.log('simer')
        res.render('home/contact');
    });
    
      router.get('/blog',function(req, res) {
        res.render('home/blog')
     });
     router.get('/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/careers',function(req, res) {
        res.render('home/careers');
    });
    
    router.get('/howwework',function(req, res) {
        res.render('home/howwework');
    });
    
     router.get('/clients',function(req, res) {
        res.render('home/clients');
    });
    
    router.get('/testimonials',function(req, res) {
        res.render('home/testimonials');
    });
    
     router.get('/visionandmission',function(req, res) {
        res.render('home/visionandmission');
    });
    
      router.get('/whyfutureworktechnologies',function(req, res) {
        res.render('home/whyfutureworktechnologies');
    });
    
    router.get('/privacypolicy',function(req, res) {
        res.render('home/privacypolicy');
    });
    router.get('/termandconditions',function(req, res) {
        res.render('home/termandconditions');
    });
    router.get('/faq',function(req, res) {
        res.render('home/faq');
    });
        
      router.get('/admin/dashboard', isAdmin, function(req, res) {
        res.render('admin/dashboard', {user: req.user});
    });
   

/***AR****/
router.get('/ar/about',function(req, res) {
        res.render('home_ar/about');
    });
    
    
      
    
     router.get('/ar/contact',function(req, res) {

        res.render('home_ar/contact');
    });
    
      router.get('/ar/blog',function(req, res) {
        res.render('home_ar/blog')
     });
     router.get('/ar/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home_ar/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/ar/careers',function(req, res) {
        res.render('home_ar/careers');
    });
    
    router.get('/ar/howwework',function(req, res) {
        res.render('home_ar/howwework');
    });
    
     router.get('/ar/clients',function(req, res) {
        res.render('home_ar/clients');
    });
    
    router.get('/ar/testimonials',function(req, res) {
        res.render('home_ar/testimonials');
    });
    
     router.get('/ar/visionandmission',function(req, res) {
        res.render('home_ar/visionandmission');
    });
    
      router.get('/ar/whyfutureworktechnologies',function(req, res) {
        res.render('home_ar/whyfutureworktechnologies');
    });
    
    router.get('/ar/privacypolicy',function(req, res) {
        res.render('home_ar/privacypolicy');
    });
    router.get('/ar/termandconditions',function(req, res) {
        res.render('home_ar/termandconditions');
    });
    router.get('/ar/faq',function(req, res) {
        res.render('home_ar/faq');
    });
        
    router.get('/ar/404', function(req, res) {
        res.render('404');
    });
    router.get('/ar/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[2]}, function(err, post) {
                if (post) {
                   // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home_ar/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    /***AR****/
    
    /***de****/
router.get('/de/about',function(req, res) {
        res.render('home_de/about');
    });
    
    
      
    
     router.get('/de/contact',function(req, res) {

        res.render('home_de/contact');
    });
    
      router.get('/de/blog',function(req, res) {
        res.render('home_de/blog')
     });
     router.get('/de/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home_de/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/de/careers',function(req, res) {
        res.render('home_de/careers');
    });
    
    router.get('/de/howwework',function(req, res) {
        res.render('home_de/howwework');
    });
    
     router.get('/de/clients',function(req, res) {
        res.render('home_de/clients');
    });
    
    router.get('/de/testimonials',function(req, res) {
        res.render('home_de/testimonials');
    });
    
     router.get('/de/visionandmission',function(req, res) {
        res.render('home_de/visionandmission');
    });
    
      router.get('/de/whyfutureworktechnologies',function(req, res) {
        res.render('home_de/whyfutureworktechnologies');
    });
    
    router.get('/de/privacypolicy',function(req, res) {
        res.render('home_de/privacypolicy');
    });
    router.get('/de/termandconditions',function(req, res) {
        res.render('home_de/termandconditions');
    });
    router.get('/de/faq',function(req, res) {
        res.render('home_de/faq');
    });
        
    router.get('/de/404', function(req, res) {
        res.render('404');
    });
    router.get('/de/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[2]}, function(err, post) {
                if (post) {
                   // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home_de/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    /***DE****/
     /***NL****/
router.get('/nl/about',function(req, res) {
        res.render('home_nl/about');
    });
    
    
      
    
     router.get('/nl/contact',function(req, res) {

        res.render('home_nl/contact');
    });
    
      router.get('/nl/blog',function(req, res) {
        res.render('home_nl/blog')
     });
     router.get('/nl/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home_nl/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/nl/careers',function(req, res) {
        res.render('home_nl/careers');
    });
    
    router.get('/nl/howwework',function(req, res) {
        res.render('home_de/howwework');
    });
    
     router.get('/nl/clients',function(req, res) {
        res.render('home_nl/clients');
    });
    
    router.get('/nl/testimonials',function(req, res) {
        res.render('home_nl/testimonials');
    });
    
     router.get('/nl/visionandmission',function(req, res) {
        res.render('home_nl/visionandmission');
    });
    
      router.get('/nl/whyfutureworktechnologies',function(req, res) {
        res.render('home_nl/whyfutureworktechnologies');
    });
    
    router.get('/nl/privacypolicy',function(req, res) {
        res.render('home_nl/privacypolicy');
    });
    router.get('/nl/termandconditions',function(req, res) {
        res.render('home_nl/termandconditions');
    });
    router.get('/nl/faq',function(req, res) {
        res.render('home_nl/faq');
    });
        
    router.get('/nl/404', function(req, res) {
        res.render('404');
    });
    router.get('/nl/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[2]}, function(err, post) {
                if (post) {
                   // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home_nl/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    /***nl****/
    
     /***zh****/
router.get('/zh/about',function(req, res) {
        res.render('home_zh/about');
    });
    
    
      
    
     router.get('/zh/contact',function(req, res) {

        res.render('home_zh/contact');
    });
    
      router.get('/zh/blog',function(req, res) {
        res.render('home_zh/blog')
     });
     router.get('/zh/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home_zh/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/zh/careers',function(req, res) {
        res.render('home_zh/careers');
    });
    
    router.get('/zh/howwework',function(req, res) {
        res.render('home_zh/howwework');
    });
    
     router.get('/zh/clients',function(req, res) {
        res.render('home_zh/clients');
    });
    
    router.get('/zh/testimonials',function(req, res) {
        res.render('home_zh/testimonials');
    });
    
     router.get('/zh/visionandmission',function(req, res) {
        res.render('home_zh/visionandmission');
    });
    
      router.get('/zh/whyfutureworktechnologies',function(req, res) {
        res.render('home_zh/whyfutureworktechnologies');
    });
    
    router.get('/zh/privacypolicy',function(req, res) {
        res.render('home_zh/privacypolicy');
    });
    router.get('/zh/termandconditions',function(req, res) {
        res.render('home_zh/termandconditions');
    });
    router.get('/zh/faq',function(req, res) {
        res.render('home_zh/faq');
    });
        
    router.get('/zh/404', function(req, res) {
        res.render('404');
    });
    router.get('/zh/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[2]}, function(err, post) {
                if (post) {
                   // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home_zh/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    /***zh****/
    
    /***fr****/
router.get('/fr/about',function(req, res) {
        res.render('home_fr/about');
    });
    
    
      
    
     router.get('/fr/contact',function(req, res) {

        res.render('home_fr/contact');
    });
    
      router.get('/fr/blog',function(req, res) {
        res.render('home_fr/blog')
     });
     router.get('/fr/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home_fr/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/fr/careers',function(req, res) {
        res.render('home_fr/careers');
    });
    
    router.get('/fr/howwework',function(req, res) {
        res.render('home_fr/howwework');
    });
    
     router.get('/fr/clients',function(req, res) {
        res.render('home_fr/clients');
    });
    
    router.get('/fr/testimonials',function(req, res) {
        res.render('home_fr/testimonials');
    });
    
     router.get('/fr/visionandmission',function(req, res) {
        res.render('home_fr/visionandmission');
    });
    
      router.get('/fr/whyfutureworktechnologies',function(req, res) {
        res.render('home_fr/whyfutureworktechnologies');
    });
    
    router.get('/fr/privacypolicy',function(req, res) {
        res.render('home_fr/privacypolicy');
    });
    router.get('/fr/termandconditions',function(req, res) {
        res.render('home_fr/termandconditions');
    });
    router.get('/fr/faq',function(req, res) {
        res.render('home_fr/faq');
    });
        
    router.get('/fr/404', function(req, res) {
        res.render('404');
    });
    router.get('/fr/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[2]}, function(err, post) {
                if (post) {
                   // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home_fr/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    /***fr****/
    
     /***fr****/
router.get('/es/about',function(req, res) {
        res.render('home_es/about');
    });
    
    
      
    
     router.get('/es/contact',function(req, res) {

        res.render('home_es/contact');
    });
    
      router.get('/es/blog',function(req, res) {
        res.render('home_es/blog')
     });
     router.get('/es/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home_es/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/es/careers',function(req, res) {
        res.render('home_es/careers');
    });
    
    router.get('/es/howwework',function(req, res) {
        res.render('home_es/howwework');
    });
    
     router.get('/es/clients',function(req, res) {
        res.render('home_es/clients');
    });
    
    router.get('/es/testimonials',function(req, res) {
        res.render('home_es/testimonials');
    });
    
     router.get('/es/visionandmission',function(req, res) {
        res.render('home_es/visionandmission');
    });
    
      router.get('/es/whyfutureworktechnologies',function(req, res) {
        res.render('home_es/whyfutureworktechnologies');
    });
    
    router.get('/es/privacypolicy',function(req, res) {
        res.render('home_es/privacypolicy');
    });
    router.get('/es/termandconditions',function(req, res) {
        res.render('home_es/termandconditions');
    });
    router.get('/es/faq',function(req, res) {
        res.render('home_es/faq');
    });
        
    router.get('/es/404', function(req, res) {
        res.render('404');
    });
    router.get('/es/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[2]}, function(err, post) {
                if (post) {
                   // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home_es/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    /***es****/
     /***nn****/
router.get('/nn/about',function(req, res) {
        res.render('home_nn/about');
    });
    
    
      
    
     router.get('/nn/contact',function(req, res) {

        res.render('home_nn/contact');
    });
    
      router.get('/nn/blog',function(req, res) {
        res.render('home_nn/blog')
     });
     router.get('/nn/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home_nn/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/nn/careers',function(req, res) {
        res.render('home_nn/careers');
    });
    
    router.get('/nn/howwework',function(req, res) {
        res.render('home_nn/howwework');
    });
    
     router.get('/nn/clients',function(req, res) {
        res.render('home_nn/clients');
    });
    
    router.get('/nn/testimonials',function(req, res) {
        res.render('home_nn/testimonials');
    });
    
     router.get('/nn/visionandmission',function(req, res) {
        res.render('home_nn/visionandmission');
    });
    
      router.get('/nn/whyfutureworktechnologies',function(req, res) {
        res.render('home_nn/whyfutureworktechnologies');
    });
    
    router.get('/nn/privacypolicy',function(req, res) {
        res.render('home_nn/privacypolicy');
    });
    router.get('/nn/termandconditions',function(req, res) {
        res.render('home_nn/termandconditions');
    });
    router.get('/nn/faq',function(req, res) {
        res.render('home_nn/faq');
    });
        
    router.get('/nn/404', function(req, res) {
        res.render('404');
    });
    router.get('/nn/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[2]}, function(err, post) {
                if (post) {
                   // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home_nn/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    /***nn****/
    
    /***pt****/
router.get('/pt/about',function(req, res) {
        res.render('home_pt/about');
    });
    
    
      
    
     router.get('/pt/contact',function(req, res) {

        res.render('home_pt/contact');
    });
    
      router.get('/pt/blog',function(req, res) {
        res.render('home_pt/blog')
     });
     router.get('/pt/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home_pt/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/pt/careers',function(req, res) {
        res.render('home_pt/careers');
    });
    
    router.get('/pt/howwework',function(req, res) {
        res.render('home_pt/howwework');
    });
    
     router.get('/pt/clients',function(req, res) {
        res.render('home_pt/clients');
    });
    
    router.get('/pt/testimonials',function(req, res) {
        res.render('home_pt/testimonials');
    });
    
     router.get('/pt/visionandmission',function(req, res) {
        res.render('home_pt/visionandmission');
    });
    
      router.get('/pt/whyfutureworktechnologies',function(req, res) {
        res.render('home_pt/whyfutureworktechnologies');
    });
    
    router.get('/pt/privacypolicy',function(req, res) {
        res.render('home_pt/privacypolicy');
    });
    router.get('/pt/termandconditions',function(req, res) {
        res.render('home_pt/termandconditions');
    });
    router.get('/pt/faq',function(req, res) {
        res.render('home_pt/faq');
    });
        
    router.get('/pt/404', function(req, res) {
        res.render('404');
    });
    router.get('/pt/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[2]}, function(err, post) {
                if (post) {
                   // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home_pt/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    /***pt****/
    /***ja****/
router.get('/ja/about',function(req, res) {
        res.render('home_ja/about');
    });
    
    
      
    
     router.get('/ja/contact',function(req, res) {

        res.render('home_ja/contact');
    });
    
      router.get('/ja/blog',function(req, res) {
        res.render('home_ja/blog')
     });
     router.get('/ja/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home_ja/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/ja/careers',function(req, res) {
        res.render('home_ja/careers');
    });
    
    router.get('/ja/howwework',function(req, res) {
        res.render('home_ja/howwework');
    });
    
     router.get('/ja/clients',function(req, res) {
        res.render('home_ja/clients');
    });
    
    router.get('/ja/testimonials',function(req, res) {
        res.render('home_ja/testimonials');
    });
    
     router.get('/ja/visionandmission',function(req, res) {
        res.render('home_ja/visionandmission');
    });
    
      router.get('/ja/whyfutureworktechnologies',function(req, res) {
        res.render('home_ja/whyfutureworktechnologies');
    });
    
    router.get('/ja/privacypolicy',function(req, res) {
        res.render('home_ja/privacypolicy');
    });
    router.get('/ja/termandconditions',function(req, res) {
        res.render('home_ja/termandconditions');
    });
    router.get('/ja/faq',function(req, res) {
        res.render('home_ja/faq');
    });
        
    router.get('/ja/404', function(req, res) {
        res.render('404');
    });
    router.get('/ja/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[2]);
            Post.findOne({'paramal': main_url[2]}, function(err, post) {
                console.log(post);
                if (post) {
                    //console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home_ja/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
   router.get('/404', function(req, res) {
        res.render('404');
    });
    router.get('/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[1]}, function(err, post) {
                if (post) {
                   // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home/post', metaTags);
                } else {
                    //res.render('404');
                }
            });
        }

    });
    app.use(function(req, res, next) {
        res.status(404);
        res.render('404');
        return;
    });
};  
    function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.email === 'ashutosh@avainfotech.com') {
        console.log('cool you are an admin, carry on your way');
        next();
    } else {
        console.log('You are not an admin');
        res.redirect('/admin');
    }
}