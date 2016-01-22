'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article'),
    Comment = mongoose.model('Comment'),
    crypto = require('crypto');

function getRandomString(len) {
  if (!len)
    len = 16;
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex');
}

exports.mockUser = function(){
  return new User({
    name: 'Full name',
    email: 'test' + getRandomString() + '@test.com',
    username: getRandomString(),
    password: 'password',
    provider: 'local'
  });
}

exports.mockArticle = function(user){
  return new Article({
    title: 'Title',
    content: 'Content',
    user: user
  });
}

exports.mockComment = function(user, article){
  return new Comment({
    text: 'Comment text',
    user: user,
    article: article
  });
}

exports.drop = function(user, article, comment, done){
  article.remove(function() {
    user.remove(function(){
      comment.remove(done);
    });
  });
}