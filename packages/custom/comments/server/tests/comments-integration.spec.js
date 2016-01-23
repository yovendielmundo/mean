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

  describe('Tests for endpoint /api/comments', function () {

    beforeEach(function (done) {
      user = testHelper.createUser('Bob');
      article = testHelper.createArticle(user);
      comment = testHelper.createComment(user, article);
      done();
    });

    it('should be able to list comments by article', function (done) {
      var app = express();

      auth.requiresLogin = function (req, res, next) {
        next();
      };

      routes(null, app, auth);

      var articleTwo = testHelper.createArticle(user);
      var anotherUser = testHelper.createUser();
      testHelper.createBulkOfComments(user, articleTwo, 2);
      testHelper.createBulkOfComments(anotherUser, articleTwo, 1);
      var numComments = 2 + 1;

      var articleTwoId = String(articleTwo._id);
      request(app)
          .get('/api/comments/article/' + articleTwoId)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);

            expect(res.body.length).to.be(numComments);
            _.forEach(res.body, function(comment) {
              // only comments from articleTwo
              expect(comment.article).equal(articleTwoId);
            });

            done();
          });
    });

    afterEach(function(done) {
      testHelper.drop(done);
    });

  });

});

