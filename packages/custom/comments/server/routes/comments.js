'use strict';

module.exports = function (Comments, app, auth) {

  var comments = require('../controllers/comments')(Comments);

  app.route('/api/comments')
      .post(auth.requiresLogin, comments.create);

  app.route('/api/comments/:commentId')
      .delete(auth.isMongoId, auth.requiresLogin, comments.destroy);

  app.route('/api/comments/article/:articleId')
      .get(comments.findByArticleId);

};
