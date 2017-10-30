
var adminApp = angular.module('fwrk.admin', [
	'ui.router',
	'btford.markdown',
	'angular-page-loader',
	'fwrk.posts',
	//'fwrk.pages',
	'fwrk.portfolios',
	'fwrk.users',
	'fwrk.categories',
	'fwrk.clients',
	'fwrk.testimonials',
	'fwrk.contacts',
	'fwrk.careers'

]);

//var Portfolio = require('./models/portfolio');

adminApp.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	.state('dashboard', {
		url: '/',
		templateUrl: '/admin/templates/admin_index.html',
		controller: 'dashboardCtrl'
	}) 
		.state('allPosts', {
			url: '/allPosts',
			templateUrl: '/admin/templates/allPosts.html',
			// resolve: {
			// 	postList: function(Posts){
			// 		return Posts.all().then(function(data){
			// 			return data;
			// 		});
			// 	}
			// },
			controller: 'AllPostsCtrl'
		})
		.state('addPost', {
			url: '/addPost',
			templateUrl: '/admin/templates/addPost.html',
			controller: 'AddPostCtrl',
                        resolve: {
				categoryList: function(Category){
					return Category.all().then(function(data){
						return data;
					});
				}
			},
                        
		})
        .state('editPost', {
			url: '/editPost/:paraml',
			templateUrl: '/admin/templates/editPost.html',
			controller: 'EditPostsCtrl',
                         resolve: {
				categoryList: function(Category){
					return Category.all().then(function(data){
						return data;
					});
				}
			},
		})

		.state('userList', {
			url: '/userList',
			templateUrl: '/admin/templates/userList.html',
			resolve: {
				userList: function(Users){
					return Users.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'AllUsersCtrl'
		})

		.state('addUser', {
			url: '/addUser',
			templateUrl: '/admin/templates/addUser.html',
			controller: 'addUserCtrl'   
		})
		.state('editUser', {
			url: '/editUser/:paraml',
			templateUrl: '/admin/templates/editUser.html',
			controller: 'editUserCtrl'
		})

		.state('addPortfolio', {
			url: '/addPortfolio',
			templateUrl: '/admin/templates/addPortfolio.html',
			controller: 'addPortfolioCtrl'   
		})
		.state('PortfolioList', {
			url: '/PortfolioList',
			templateUrl: '/admin/templates/PortfolioList.html',
			resolve: {
				portfolioList: function(Portfolios){
					return Portfolios.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'PortfolioListCtrl'
		})
		.state('addCategory', {
			url: '/addCategory',
			templateUrl: '/admin/templates/addCategory.html',
			controller: 'addCategoryCtrl'   
		})
		.state('CategoryList', {
			url: '/CategoryList',
			templateUrl: '/admin/templates/allCategories.html',
			resolve: {
				categoryList: function(Category){
					return Category.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'CategoryListCtrl'
		})
		.state('editCategory', {
			url: '/editCategory/:paraml',
			templateUrl: '/admin/templates/editCategory.html',
			controller: 'editCategoryCtrl'
		})

		.state('addClient', {
			url: '/addClient',
			templateUrl: '/admin/templates/addClient.html',
			controller: 'addClientCtrl'   
		})
		.state('ClientList', {
			url: '/ClientList',
			templateUrl: '/admin/templates/clientList.html',
			resolve: {
				ClientsList: function(Clients){
					return Clients.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'ClientListCtrl'
		})
		.state('addTestimonial', {
			url: '/addTestimonial',
			templateUrl: '/admin/templates/addTestimonial.html',
			controller: 'addTestimonialCtrl'   
		})
		.state('TestimonialList', {
			url: '/TestimonialList',
			templateUrl: '/admin/templates/TestimonialList.html',
			resolve: {
				testimonialList: function(Testimonial){
					return Testimonial.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'TestimonialListCtrl'
		})
		.state('ContactList', {
			url: '/ContactList',
			templateUrl: '/admin/templates/contactList.html',
			resolve: {
				ContactList: function(Contact){
					return Contact.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'ContactListCtrl'
		})
		.state('resumeList', {
			url: '/jobrequests',
			templateUrl: '/admin/templates/resumeList.html',
			resolve: {
				RequestsList: function(Careers){
					return Careers.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'RequestsListCtrl'
		})
                .state('LanguageUpdateEn', {
			url: '/LanguageUpdateEn',
			templateUrl: '/admin/templates/LanguageUpdate_en.html',
			controller: 'LanguageUpdateEnCtrl'
		})
                  .state('LanguageUpdateDe', {
			url: '/LanguageUpdateDe',
			templateUrl: '/admin/templates/LanguageUpdate_de.html',
			controller: 'LanguageUpdateDeCtrl'
		})
                  .state('LanguageUpdateAr', {
			url: '/LanguageUpdateAr',
			templateUrl: '/admin/templates/LanguageUpdate_ar.html',
			controller: 'LanguageUpdateArCtrl'
		})
                .state('LanguageUpdateNl', {
			url: '/LanguageUpdateNl',
			templateUrl: '/admin/templates/LanguageUpdate_nl.html',
			controller: 'LanguageUpdateNlCtrl'
		})
                .state('LanguageUpdateZh', {
			url: '/LanguageUpdateZh',
			templateUrl: '/admin/templates/LanguageUpdate_zh.html',
			controller: 'LanguageUpdateZhCtrl'
		})
                .state('LanguageUpdateEs', {
			url: '/LanguageUpdateEs',
			templateUrl: '/admin/templates/LanguageUpdate_es.html',
			controller: 'LanguageUpdateEsCtrl'
		})
                .state('LanguageUpdateNn', {
			url: '/LanguageUpdateNn',
			templateUrl: '/admin/templates/LanguageUpdate_nn.html',
			controller: 'LanguageUpdateNnCtrl'
		})
                .state('LanguageUpdatePt', {
			url: '/LanguageUpdatePt',
			templateUrl: '/admin/templates/LanguageUpdate_pt.html',
			controller: 'LanguageUpdatePtCtrl'
		})
                .state('LanguageUpdateJa', {
			url: '/LanguageUpdateJa',
			templateUrl: '/admin/templates/LanguageUpdate_ja.html',
			controller: 'LanguageUpdateJaCtrl'
		})
                .state('LanguageUpdateFr', {
			url: '/LanguageUpdateFr',
			templateUrl: '/admin/templates/LanguageUpdate_fr.html',
			controller: 'LanguageUpdateFrCtrl'
		})
});

