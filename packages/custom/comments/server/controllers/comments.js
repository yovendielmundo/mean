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
     * Find article by id
     */
    comment: function(req, res, next, id) {
      Comment.load(id, function(err, comment) {
        if (err) return next(err);
        if (!comment) return next(new Error('Failed to load article ' + id));
        req.comment = comment;
        next();
      });
    },
    /**
     * Create an article
     */
    create: function(req, res) {
      var comment = new Comment(req.body);
      comment.user = req.user;

      comment.save(function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot save the article'
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
            error: 'Cannot delete the article'
          });
        }

        res.json(comment);
      });
    },
    /**
     * Show an comment
     */
    show: function(req, res) {
      res.json(req.comment);
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