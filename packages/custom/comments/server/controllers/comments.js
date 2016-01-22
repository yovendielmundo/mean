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
     * Find comment by id
     */
    comment: function(req, res, next, id) {
      Comment.load(id, function(err, comment) {
        if (err) return next(err);
        if (!comment) return next(new Error('Failed to load comment ' + id));
        req.comment = comment;
        next();
      });
    },
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
     * Update an comment
     */
    update: function(req, res) {
      var comment = req.comment;

      comment = _.extend(comment, req.body);


      comment.save(function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot update the comment'
          });
        }

        res.json(comment);
      });
    },
    /**
     * Delete an comment
     */
    destroy: function(req, res) {
      var comment = req.comment;

      comment.remove(function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot delete the comment'
          });
        }

        res.json(comment);
      });
    },
    fetchByParent: function(req, res) {
      var parentId = req.params.parentId;
      var limit = parseInt(req.query.limit);
      var query = Comment.find({
            article: parentId
          })
          .sort({
            _id: -1
          })
          .populate('user', 'name username');
      if (limit) {
        query.limit(limit);
      }

      query.exec(function(err, comments) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: 'Cannot list the comments'
          });
        } else {
          res.json(comments);
        }
      });
    },
    /**
     * List of comment
     */
    all: function(req, res) {

      Comment.find().populate('user', 'name username').exec(function(err, comments) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot list the comments'
          });
        }

        res.json(comments)
      });

    }
  };
}