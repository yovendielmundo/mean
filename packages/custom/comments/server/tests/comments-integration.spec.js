'use strict';

var expect = require('expect.js'),
    testHelper = require('./test-helper'),
    express = require('express'),
    request = require('supertest'),
    auth = require('../../../../core/users/authorization'),
    routes = require('../routes/comments'),
    _ = require('lodash');

describe('<Integration Test>', function(){
  var user, article, comment;

  describe('Testing /api/comments', function () {

    beforeEach(function (done) {
      user = testHelper.createUser('Bob');
      article = testHelper.createArticle(user);
      comment = testHelper.createComment(user, article);
      done();
    });

    it('should list all comments when user is an administrator', function (done) {
      var app = express();
      var bob = user;
      var joe = testHelper.createUser('Joe');
      var admin = testHelper.createAdminUser('Admin');

      auth.requiresLogin = function (req, res, next) {
        next();
      };
      routes(null, app, auth);

      var articleTwo = testHelper.createArticle(bob);

      testHelper.createBulkOfComments(bob, articleTwo, 2);
      testHelper.createBulkOfComments(joe, articleTwo, 1);
      // there are two comments from Bob and one comment from Joe (2 + 1)
      var numComments = 2 + 1;

      var articleTwoId = String(articleTwo._id);
      // An admin user does the request
      app.request.user = admin;
      request(app)
          .get('/api/comments/article/' + articleTwoId)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);

            expect(numComments).to.be(res.body.length);
            _.forEach(res.body, function(comment) {
              // only comments from articleTwo
              expect(articleTwoId).equal(comment.article);
            });

            done();
          });
    });

    it('should list comments not pending or belongs to the user', function (done) {
      var app = express();
      var bob = user;
      var joe = testHelper.createUser('Joe');

      auth.requiresLogin = function (req, res, next) {
        next();
      };
      routes(null, app, auth);

      var bobArticle = testHelper.createArticle(bob);

      testHelper.createBulkOfComments(bob, bobArticle, 2);
      testHelper.createBulkOfComments(joe, bobArticle, 2);
      testHelper.createCommentApproved(joe, bobArticle);
      // there are two comments from Bob and three from Joe but only one is approved
      var numComments = 2 + 1;

      // Bob user does the request
      app.request.user = bob;
      request(app)
          .get('/api/comments/article/' + bobArticle._id)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);

            expect(numComments).to.be(res.body.length);

            var bobId = String(bob._id);
            _.forEach(res.body, function(comment) {
              // only comments from Bob or comments not pending
              if(comment.status === 'pending') {
                expect(bobId).equal(comment.user._id);
              }
            });
            done();
          });
    });


    afterEach(function(done) {
      testHelper.drop(done);
    });

  });

});

