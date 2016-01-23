'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article'),
    Comment = mongoose.model('Comment'),
    crypto = require('crypto');

var getRandomString = function(len) {
  if (!len)
    len = 16;
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex');
}

var newUser = function(name) {
  return new User({
    name: name,
    email: 'test' + name + '@test.com',
    username: getRandomString(),
    password: 'password',
    provider: 'local'
  });
}

var newArticle = function (user) {
  return new Article({
    title: 'Article by: ' + user.name,
    content: 'Content of the article',
    user: user
  });
};

var newComment = function(user, article) {
  return new Comment({
    text: 'Comment for article' + article.title,
    user: user,
    article: article
  });
}

exports.createUser = function(){
  var user = newUser(getRandomString(4));
  User.create(user);
  return user;
}

exports.createArticle = function(user){
  var article = newArticle(user);
  Article.create(article);
  return article;
}

exports.createComment = function(user, article){
  var comment = newComment(user, article);
  Comment.create(comment);
  return comment;
}

exports.createBulkOfComments = function(user, article, num){
  var docs = [];
  for (var i = 0; i < num; i++){
    docs.push(newComment(user, article));
  }
  Comment.create(docs);
}

exports.drop = function(done){
  User.remove(function() {
    Article.remove(function () {
      Comment.remove(done);
    });
  });
}