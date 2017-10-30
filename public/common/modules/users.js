
var usersModule = angular.module('fwrk.users', []);

usersModule.service('Users', function($http) {

    return {
        all: function() {
            return $http.get('/api/users').then(function(userList) {
                return userList.data;
            });
        },
        add: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
           homeadd: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users/home',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
         login: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users/login',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        remove: function(usr) {
            //console.log("here")
            return $http({
                method: 'post',
                url: '/api/deleteuser',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        update: function(usr) {

            return $http({
                method: 'post',
                url: '/api/editusrID',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        sigledata: function(id) {
            return $http({
                method: 'post',
                url: '/api/edituser',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        }
    };
});