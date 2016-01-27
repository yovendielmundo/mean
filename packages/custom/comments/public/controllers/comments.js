'use strict';

/* jshint -W098 */
angular.module('mean.comments').controller('CommentsController', ['$scope', 'Global', 'Comments', 'MeanUser', 'fetchComments', 'utils',
  function($scope, Global, Comments, MeanUser, fetchComments, utils) {

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

      fetchComments.query(queryParams)
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
        user: MeanUser.user._id
      });

      comment.$save().then(function(data) {
        data.user = MeanUser.user;

        if ($scope.parent.comments.length === 0) {
          $scope.parent.comments = [];
        }
        $scope.parent.comments.push(data);
      });

      this.text = '';
    };

    $scope.remove = function(comment) {
      var status = confirm('Do you want to delete?');
      if (status) {
        var commentDelete = new Comments(comment);
        commentDelete.$remove().then(function() {
          utils.$removeCommentById($scope.parent.comments, comment._id);
        });
      }
    };

    $scope.approve = function(comment) {
      var commentUpdate = new Comments(comment);
      commentUpdate.$update().then(function(comment) {
        var c = utils.$findCommentById($scope.parent.comments, comment._id);
        if(c !== null) c.status = comment.status;
      });
    };

    $scope.canDelete = function(comment) {
      return MeanUser.isAdmin || comment.user._id === MeanUser.user._id;
    };

    $scope.canApprove = function(comment) {
      return comment.status === 'pending' && MeanUser.isAdmin;
    };

  }
]);
