'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'),
    User = mongoose.model('User'),
    _ = require('lodash');


module.exports = function(Comments) {

  return {
    /**
     * Create an comment
     */
    create: function(req, res) {
      var comment = new Comment(req.body);
      comment.user = req.user;
      comment.save(function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot save the comment'
          });
        }

        res.json(comment);
      });
    },
    /**
     * Delete an comment
     */
    destroy: function(req, res) {
      var commentId = req.params.commentId;
      Comment.remove({'_id': commentId},function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot delete the comment'
          });
        }

        res.status(202).json('Done');
      });
    },
    /**
     * find by article id
     * @param req
     * @param res
     */
    findByArticleId: function(req, res) {
      var articleId = req.params.articleId;
      var limit = parseInt(req.query.limit);
      var query = Comment.find({article: articleId}).sort({_id: -1}).populate('user', 'name username');

      if (limit) {
        query.limit(limit);
      }

      query.exec(function(err, comments) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot list the comments'
          });
        } else {

          var user = req.user;
          if(user.isAdmin()) {
            res.json(comments);
          } else {
            var filteredComments = _.filter(comments, function(c) {
              return !c.isPending() || _.isEqual(c.user._id, req.user._id)
            });

            res.json(filteredComments);
          }

        }
      });
    },
    /**
     * Delete an comment
     */
    approve: function(req, res) {

      var query = {'_id': req.body._id};
      var update = {status: Comment.status.approved};
      var options = {new: false};

      Comment.findOneAndUpdate(query, update, options, function(err, comment) {
        if (err) {
          return res.status(500).json({
           error: 'Cannot update the comment'
           });
        }
        comment.status = Comment.status.approved;
        res.json(comment);
      });

    }

  };
}