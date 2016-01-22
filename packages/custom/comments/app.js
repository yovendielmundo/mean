'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Comments = new Module('comments');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Comments.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Comments.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Comments.menus.add({
    title: 'Comments',
    link: 'comments',
    roles: ['authenticated', 'admin'],
    menu: 'main'
  });


  Comments.aggregateAsset('js', '../lib/angular-timeago/src/timeAgo.js');
  Comments.aggregateAsset('css', 'comments.css');

  Comments.angularDependencies(['yaru22.angular-timeago']);

  return Comments;
});
