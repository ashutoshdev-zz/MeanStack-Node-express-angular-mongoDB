/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('PostCtrl', function($scope, Posts, Pages,Portfolios, $location,PagerService) {
    $scope.url = {};
    $scope.url.path = $location.absUrl().split('/')[3];
    
    Posts.sigledata($scope.url).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            $scope.description = res.description;
            $scope.himage = res.himage;
            $scope.simage = res.simage;
            $scope.title = res.title;
        }
    });
    Pages.singlepost().then(function(res) {
        if (res == null) {
            console.log(res);
        } else {
           // console.log(res);
                    $scope.single_name=res.name;
                    $scope.single_desc=res.description;
                    $scope.single_image=res.image;
                    $scope.single_dest=res.designation;                      
        }
    });
     Portfolios.all().then(function(res) {
        if (res == null) {
            console.log(res);
        } else {
            $scope.portfolio={};
            $scope.portfolio=res;
           // console.log(res);
                     
        }
    });

    



});
app.controller('ClientsCtrl', function($scope,ClientsList,Clients) {
    
    $scope.posts = ClientsList;
    
});
app.controller('BlogsCtrl', function($scope,Posts,PagerService) {
    // blog pages starts here
    $scope.vm = {};
    Posts.all().then(function(data){
        //$("#mydiv").hide();
        $scope.total_records = data.total;
        $scope.blogs = data.posts;
        console.log(data); 
        // paging start
        $scope.vm.dummyItems = $scope.total_records; // dummy array of items to be paged
       $scope.vm.pager = {};
       $scope.vm.setPage = setPage;
       initController();
    
       function initController() {
           // initialize to page 1
           $scope.vm.setPage(1);
       }

    });
    $scope.pagination = function(start_from,per_page){
        var pagination_attr ={
            offset: start_from,
            limit: per_page
        }
        Posts.pagination(pagination_attr).then(function(data){
            console.log(data)
            $scope.total_records = data.total;
            $scope.blogs = data.posts;
        });
    }

    //set page items - PAGINATION
       function setPage(page) {
           if (page < 1 || page > $scope.vm.pager.totalPages) {
               return;
           }
    
            // get pager object from service
            $scope.vm.pager = PagerService.GetPager($scope.vm.dummyItems, page);
            console.log($scope.vm.pager)
           // get current page items
            $scope.pagination($scope.vm.pager.startIndex,$scope.vm.pager.endPage)
           // get current page of items
        //   $scope.vm.items = $scope.vm.dummyItems.slice($scope.vm.pager.startIndex, $scope.vm.pager.endIndex + 1);
       }
    
});
app.controller('TestimonialsCtrl', function($scope,Testimonial) {
    
    Testimonial.all().then(function(data){
        $scope.testimonials = data;
        console.log($scope.testimonials)
    });
})

app.controller('ContactsCtrl', function($scope,Contact) {
    console.log('ContactsCtrl')
    $scope.post ={}
    
    $scope.addContact = function() {
        console.log(this.post)
        $scope.newPost = {};
        $scope.newPost.name = this.post.name;
        $scope.newPost.email = this.post.email;
        $scope.newPost.phone = this.post.phone;
        $scope.newPost.budget = this.post.budget;
        $scope.newPost.message = this.post.message;

        Contact.add($scope.newPost).then(function(res) {
            console.log(res);
            $scope.success_msg = "Thanks for contacting us, We will be get back to you soon!"
        });
        $scope.post = {};
    };
});
app.controller('CareersCtrl',function ($scope, Careers) {
    $scope.post ={}
    //  Careers.all().then(function(data){
       
    //     console.log(data);
    // });
    
    $scope.uploadFile = function(input) {
          $scope.loading = true;
     // console.log(input.files[0]);
        Careers.uploadimage(input.files[0]).then(function(res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {                
                $scope.imgshow = res[0].location;
            } 
        });
    };
    // // upload later on form submit or something similar
     $scope.submit = function() {
         console.log($scope.post)
        $scope.newData ={}
        $scope.newData.name=$scope.post.name;
        $scope.newData.file = $scope.imgshow;
        $scope.newData.position=$scope.post.position;
        $scope.newData.phone1 =$scope.post.phone1;
        $scope.newData.phone2 = $scope.post.phone2;
        $scope.newData.email =$scope.post.email;
        $scope.newData.cover_letter = $scope.post.cover_letter;
        console.log('simer')
        Careers.add($scope.newData).then(function(res){
            console.log(res)
            $scope.success_msg = "Thanks for contacting us, We will be get back to you soon!"
            $scope.post = {}
        })
        // if ($scope.form.file.$valid && $scope.post.file) {
    //   if ($scope.post.file) {
    //     $scope.upload($scope.post.file);
    //   }
    };

    // // upload on file select or drop
    // $scope.upload = function (file) {
    //     Upload.upload({
    //         url: 'api/upload_resume',
    //         data: {file: file, 'name': $scope.post.name}
    //     }).then(function (resp) {
    //         console.log(resp)
    //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    //     }, function (resp) {
    //         console.log('Error status: ' + resp.status);
    //     }, function (evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //     });
    // };
    
});