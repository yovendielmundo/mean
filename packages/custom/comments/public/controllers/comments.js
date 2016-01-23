'use strict';

/* jshint -W098 */
angular.module('mean.comments').controller('CommentsController', ['$scope', 'Global', 'Comments', 'FetchComments',
  function($scope, Global, Comments, FetchComments) {



    $scope.global = Global;
    $scope.package = {
      name: 'comments'
    };

    $scope.loadcomment = false;

    $scope.findComments = function(parent, fixedNumberOfComments) {
      $scope.parent = parent;
      var queryParams = {};

      if (fixedNumberOfComments) {
        queryParams = {
          articleId: parent._id,
          limit: fixedNumberOfComments + 1
        };
      } else {
        queryParams = {
          articleId: parent._id
        };
      }

      FetchComments.query(queryParams)
          .$promise.then(function(comments) {
        if (fixedNumberOfComments && comments.length > fixedNumberOfComments) {
          $scope.loadcomment = true;
          $scope.parent.comments = comments.slice(0, -1);
        } else {
          $scope.loadcomment = false;
          $scope.parent.comments = comments;
        }
      });
    };

    $scope.create = function(text, parent) {
      var comment = new Comments({
        text: text,
        article: parent._id,
        user: Global.user._id
      });

      comment.$save().then(function(data) {
        data.user = Global.user;

        if ($scope.parent.comments.length === 0) {
          $scope.parent.comments = [];
        }
        $scope.parent.comments.push(data);
      });

      this.text = '';
    };

    $scope.remove = function(comment, index) {
      var status = confirm('Do you want to delete this comment.?');
      if (status) {
        var commentDelete = new Comments(comment);
        commentDelete.$remove().then(function(comment) {
          $scope.parent.comments.splice(index, 1);
        });
      }
    };

  }
]);
