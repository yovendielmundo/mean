'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash');

var pending = 'pending';
var approved = 'approved';
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
  status: {
    type: String,
    trim: true,
    required: true,
    default: pending
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

CommentSchema.methods.isPending = function() {
  return this.status === pending;
};

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

CommentSchema.statics.status = {
  approved: approved,
  pending: pending
};

mongoose.model('Comment', CommentSchema);