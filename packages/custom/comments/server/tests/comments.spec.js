'use strict';

var expect = require('expect.js'),
    mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'),
    testHelper = require('./test-helper');

describe('<Unit Test>', function() {
  describe('Model Comment:', function() {

    var user, article;

    beforeEach(function(done) {
      user = testHelper.createUser('Joe')
      article = testHelper.createArticle(user);
      done();
    });

    describe('Method Save', function() {

      it('should be able to save a comment', function(done) {
        var comment = new Comment({
          text: 'Comment text',
          user: user,
          article: article
        });

        return comment.save(function(err, data) {
          expect(err).to.be(null);
          expect(data.text).to.equal('Comment text');
          expect(data.status).to.equal('pending');
          expect(data.user.length).to.not.equal(0);
          expect(data.article.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          expect(data.updated.length).to.not.equal(0);
          comment.remove(done);
        });

      });

      it('should be able to show an error when try to save without text', function(done) {
        var comment = new Comment({
          text: '',
          user: user,
          article: article
        });

        return comment.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });


      it('should be able to show an error when try to save without user', function(done) {
        var comment = new Comment({
          text: 'Comment text',
          article: article
        });

        return comment.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should be able to show an error when try to save without article', function(done) {
        var comment = new Comment({
          text: 'Comment text',
          user: user
        });

        return comment.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

    });

    afterEach(function(done) {
      testHelper.drop(done);
    });

  });
});