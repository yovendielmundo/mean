'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Menus = new Module('menus');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Menus.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Menus.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Menus.menus.add({
    title: 'menu settings',
    link: 'menus',
    roles: ['admin'],
    menu: 'modules'
  });

  Menus.menus.add({
    title: 'MENUS',
    link: 'menus',
    roles: ['admin'],
    menu: 'admin',
    icon: 'fa-list'
  });

  Menus.aggregateAsset('css', 'menus.css');

  Menus.aggregateAsset('js', '../lib/jquery-ui/jquery-ui.min.js', {
    absolute: false,
    global: true
  });

  Menus.aggregateAsset('js', '../lib/angular-dragdrop/src/angular-dragdrop.min.js', {
    absolute: false,
    global: true
  });

  Menus.angularDependencies(['ngDragDrop']);

  Menus.settings(function(err, settings) {
    if (!settings.settings.menus)
      Menus.settings({
        'menus': ['admin', 'main', 'footer', 'account', 'modules']
      });
  });
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Menus.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Menus.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Menus.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Menus;
});