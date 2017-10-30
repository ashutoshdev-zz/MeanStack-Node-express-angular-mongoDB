
var pagesModule = angular.module('fwrk.pages', []);

pagesModule.service('Pages', function($http){

	return {
//		all: function(){
//			return $http.get('/api/pages').then(function(postList){
//				return postList.data;
//			});
//		},
//		add: function(newPost){
//			return $http({
//				method: 'post',
//				url: '/api/posts',
//				data: newPost
//			}).then(function(res){
//				// return the new post
//				return res.data;
//			}).catch(function(err){
//				console.error('Something went wrong adding the post!');
//				console.error(err);
//				return err;
//			});
//		},
//		remove: function(){
//
//		},
//		update: function(){
//
//		},
                singlepost: function(){
		return $http.get('/api/singlepost').then(function(singlepost){
				return singlepost.data;
			});
		}
	};
});