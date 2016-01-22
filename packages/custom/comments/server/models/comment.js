'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash');


/**
 * Comment Schema
 */
var CommentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    trim: true,
    required: true
  },
  article: {
    type: Schema.ObjectId,
    ref: 'Article',
    index: true,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  userName: {
    type: String
  }
});

/**
 * Validations
 */
CommentSchema.path('text').validate(function (text) {
  return !_.isEmpty(text);
}, 'Comment cannot be blank');

/**
 * Statics
 */
CommentSchema.statics.load = function (id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};
mongoose.model('Comment', CommentSchema);