'use strict';

angular.module('mean.comments').factory('Comments', ['$resource',
  function($resource) {
    return $resource('api/comments/:commentId', {
      commentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]).factory('FetchComments', ['$resource',
  function($resource) {
    var config = {
      query: {
        method: 'GET',
        isArray: true
      },
    };
    return $resource('api/comments/parent/:parentId', {
      parentId: '@_id'
    }, config);
  }
]);
