
var postsModule = angular.module('fwrk.posts', []);

postsModule.service('Posts', function($http) {

    return {
        all: function() {
            return $http.get('/api/posts').then(function(postList) {
                return postList.data;
            });
        },
        add: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/posts',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        remove: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/delete',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        update: function(newPost) {


            return $http({
                method: 'post',
                url: '/api/editparmal',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        pagination: function(pagination_attr) {
            console.log(pagination_attr);
                        return $http({
                            method: 'get',
                            url: '/api/pagination_posts',
                            params: pagination_attr
                        }).then(function(res) {
                            // return the new post
                            return res.data;
                        }).catch(function(err) {
                            console.error('Something went wrong adding the post!');
                            console.error(err);
                            return err;
                        });
                    },
        sigledata: function(parmal) {

            return $http({
                method: 'post',
                url: '/api/parmal',
                data: parmal
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        getparamel: function() {
            console.log('bn')
            return $http.get('/api/updatepermalinks').then(function(List) {
                return List.data;
            });
        },
        // update_paramel: function(parmal) {
        //                 return $http({
        //                     method: 'post',
        //                     url: '/api/updatepermalinks',
        //                     data: parmal
        //                 }).then(function(res) {
        //                     // return the new post
        //                     return res.data;
        //                 }).catch(function(err) {
        //                     console.error('Something went wrong adding the post!');
        //                     console.error(err);
        //                     return err;
        //                 });
        //             }
    };
});