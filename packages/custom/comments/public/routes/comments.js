'use strict';

angular.module('mean.comments').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('comments', {
      url: '/comments',
      templateUrl: 'comments/views/index.html'
    });
  }
]);
