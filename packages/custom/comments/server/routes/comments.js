'use strict';

// Article authorization helpers
var hasAuthorization = function (req, res, next) {
  if (!req.user.isAdmin && !req.comment.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function (Comments, app, auth) {

  var comments = require('../controllers/comments')(Comments);

  app.route('/api/comments')
      .get(auth.requiresLogin, comments.all)
      .post(auth.requiresLogin, comments.create);

  app.route('/api/comments/:commentId')
      .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, comments.update)
      .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, comments.destroy);


  // Finish with setting up the postId param
  app.param('commentId', comments.comment);


};
