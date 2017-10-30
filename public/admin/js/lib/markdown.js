/*
 * angular-markdown-directive v0.3.1
 * (c) 2013-2014 Brian Ford http://briantford.com
 * License: MIT
 */

'use strict';

angular.module('btford.markdown', ['ngSanitize']).
  provider('markdownConverter', function () {
    var opts = {};
    return {
      config: function (newOpts) {
        opts = newOpts;
      },
      $get: function () {
        return new showdown.Converter(opts);
      }
    };
  }).
  directive('btfMarkdown', ['$sanitize', 'markdownConverter', function ($sanitize, markdownConverter) {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        if (attrs.btfMarkdown) {
          scope.$watch(attrs.btfMarkdown, function (newVal) {
            var html = newVal ? $sanitize(markdownConverter.makeHtml(newVal)) : '';
            element.html(html);
          });
        } else {
          var html = $sanitize(markdownConverter.makeHtml(element.text()));
          element.html(html);
        }
      }
    };
  }])
  .filter('range', function() {
    return function(input, total) {
      total = parseInt(total);
  
      for (var i=1; i<total; i++) {
        input.push(i);
      }
  
      return input;
    };
  })
  .service('PagerService',function(){
    // service definition
    var service = {};
    
       service.GetPager = GetPager;
    
       return service;
    
       // service implementation
       function GetPager(totalItems, currentPage, pageSize) {
         console.log(totalItems)
         console.log(currentPage)
         console.log(pageSize)
           // default to first page
           currentPage = currentPage || 1;
    
           // default page size is 10
           pageSize = pageSize || 10;
    
           // calculate total pages
           var totalPages = Math.ceil(totalItems / pageSize);
    
           var startPage, endPage;
           if (totalPages <= 10) {
               // less than 10 total pages so show all
               startPage = 1;
               endPage = totalPages;
           } else {
               // more than 10 total pages so calculate start and end pages
               if (currentPage <= 6) {
                   startPage = 1;
                   endPage = 10;
               } else if (currentPage + 4 >= totalPages) {
                   startPage = totalPages - 9;
                   endPage = totalPages;
               } else {
                   startPage = currentPage - 5;
                   endPage = currentPage + 4;
               }
           }
    
           // calculate start and end item indexes
           var startIndex = (currentPage - 1) * pageSize;
           var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    
           // create an array of pages to ng-repeat in the pager control
           //var pages = _.range(startPage, endPage + 1);
          
            var pages = [];
            for (var i = startPage; i <= endPage + 1; i++) {
              pages.push(i);
            }


           // return object with all pager properties required by the view
           return {
               totalItems: totalItems,
               currentPage: currentPage,
               pageSize: pageSize,
               totalPages: totalPages,
               startPage: startPage,
               endPage: endPage,
               startIndex: startIndex,
               endIndex: endIndex,
               pages: pages
           };
       }

  });