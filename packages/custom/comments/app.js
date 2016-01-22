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
    title: 'comments example page',
    link: 'comments example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Comments.aggregateAsset('css', 'comments.css');

  return Comments;
});
