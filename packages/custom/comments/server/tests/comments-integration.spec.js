'use strict';

var expect = require('expect.js'),
    testHelper = require('./test-helper'),
    express = require('express'),
    request = require('supertest'),
    auth = require('../../../../core/users/authorization'),
    routes = require('../routes/comments');

describe('<Integration Test>', function(){
  var user, article, comment;

  describe('Endpoint /api/comments', function () {

    beforeEach(function (done) {
      user = testHelper.mockUser();
      user.save(function () {
        article = testHelper.mockArticle(user);
        article.save(function () {
          comment = testHelper.mockComment(user, article);
          done();
        });
      });
    });

    it('should be able to list comments', function (done) {
      this.timeout(10000);
      var app = express();
      auth.requiresLogin = function (req, res, next) {
        next();
      };

      routes(null, app, auth);

      comment.save(function (err) {
        expect(err).to.be(null);
        request(app)
            .get('/api/comments')
            .expect(200)
            .end(function (err, res) {
              if (err) {
                return done(err);
              } else {
                var response = JSON.parse(JSON.stringify(res.body));
                expect(response.length).to.be(1);
                done();
              }
            });
      });
    });

    afterEach(function(done) {
      this.timeout(10000);
      testHelper.drop(user, article, comment, done);
    });

  });

});

