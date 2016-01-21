'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var TestTheme = new Module('testTheme');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
TestTheme.register(function(app, auth, database, system) {

  //We enable routing. By default the Package Object is passed to the routes
  TestTheme.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  TestTheme.menus.add({
    title: 'Page one',
    link: 'page-one',
    roles: ['authenticated', 'anonymous'],
    menu: 'testThemeMain'
  });

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');

  TestTheme.aggregateAsset('css', 'testTheme.css');
  TestTheme.angularDependencies(['mean.system']);
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    TestTheme.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    TestTheme.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    TestTheme.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return TestTheme;
});
