'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article'),
    Comment = mongoose.model('Comment');

/**
 * Globals
 */
var user;
var article;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Comment:', function() {

    beforeEach(function(done) {
      this.timeout(10000);
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });
      user.save(function() {
        article = new Article({
          title: 'Article Title',
          content: 'Article Content',
          user: user
        });

        article.save(function(err, data) {
          expect(err).to.be(null);
          done();
        });
      });
    });

    describe('Method Save', function() {

      it('should be able to save a comment', function(done) {
        this.timeout(10000);

        var comment = new Comment({
          text: 'Comment text',
          user: user,
          article: article
        });

        return comment.save(function(err, data) {
          expect(err).to.be(null);
          expect(data.text).to.equal('Comment text');
          expect(data.user.length).to.not.equal(0);
          expect(data.article.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          expect(data.updated.length).to.not.equal(0);
          comment.remove(done);
        });

      });

      it('should be able to show an error when try to save without text', function(done) {
        this.timeout(10000);
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
        this.timeout(10000);
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
        this.timeout(10000);
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
      this.timeout(10000);
      article.remove(function() {
        user.remove(done);
      });
    });
  });
});