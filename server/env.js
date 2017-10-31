var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
	
module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://tddestfdddwrk:ddd@ds147822242.mlab.com:47822242/fwrk',
		port: process.env.PORT || 8080
	},
	production: {
		rootPath: rootPath,
		db: 'mongodb://testfwrk:teseeetfwrk@ds147822242.mlab.com:47222842/fw22rk' || 'you can add a mongolab uri here ($ heroku config | grep MONGOLAB_URI)',
		port: process.env.PORT || 80
	}
};
