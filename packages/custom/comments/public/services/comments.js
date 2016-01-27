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
]).factory('fetchComments', ['$resource',
  function($resource) {
    var config = {
      query: {
        method: 'GET',
        isArray: true
      },
    };
    return $resource('api/comments/article/:articleId', {
      articleId: '@_id'
    }, config);
  }
]).factory('utils', function() {
  return {
    $findCommentById: function(comments, id) {
      for(var i = 0; i < comments.length; i++) {
        var item = comments[i];
        if(item._id === id) {
          return item;
        }
      }
      return null;
    },
    $removeCommentById: function(comments, id) {
      for(var i = 0; i < comments.length; i++) {
        var item = comments[i];
        if(item._id === id) {
          comments.splice(i, 1);
        }
      }
    }
  }
});
