
var careersModule = angular.module('fwrk.careers', []);

careersModule.service('Careers', function($http) {
    return {
        all: function() {
            return $http.get('/api/careers').then(function(careerList) {
                return careerList.data;
            });
        },
        add: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/careers',
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
                url: '/api/deletecategory',
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
        sigledata: function(parmal) {
            console.log(parmal)
            console.log('simer')
            return $http({
                method: 'post',
                url: '/api/parmal_cat',
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
        upload: function (data, Upload) {
            Upload.upload({
                url: 'api/upload_resume',
                data: {file: data.file, 'name': data.name}
            }).then(function (resp) {
                console.log(resp)
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        },
        uploadimage: function(image) {
            //console.log("dd");
            //console.log(image);
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            return $http({
                method: 'post',
                url: '/api/uploadimage',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
         languageupdate: function (data) {           
            return $http({
                method: 'post',
                url: '/api/languageupdate',
                data: data
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the data!');
                console.error(err);
                return err;
            });
        },
            languageall: function (data) {           
            return $http({
                method: 'post',
                url: '/api/languageall',
                data: data
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the data!');
                console.error(err);
                return err;
            });
        }
    };
});