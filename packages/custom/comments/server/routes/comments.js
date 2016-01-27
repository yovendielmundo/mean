'use strict';

module.exports = function (Comments, app, auth) {

  var comments = require('../controllers/comments')(Comments);

  app.route('/api/comments')
      .post(auth.requiresLogin, comments.create);

  app.route('/api/comments/:commentId')
      .delete(auth.isMongoId, auth.requiresLogin, comments.destroy)
      .put(auth.isMongoId, auth.requiresAdmin, comments.approve);

  app.route('/api/comments/article/:articleId')
      .get(auth.requiresLogin, comments.findByArticleId);

};
