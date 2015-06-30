'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var Admin = new Module('admin');
/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

Admin.register(function(app, auth, database) {

    Admin.menus.add({
        title: 'admin settings',
        link: 'admin settings',
        roles: ['admin'],
        menu: 'modules'
    });

    Admin.menus.add({
        title: 'MODULES',
        link: 'modules',
        roles: ['admin'],
        menu: 'admin',
        icon: 'fa-th'
    });

    Admin.menus.add({
        title: 'THEMES',
        link: 'themes',
        roles: ['admin'],
        menu: 'admin',
        icon: 'fa-diamond'
    });

    Admin.menus.add({
        title: 'SETTINGS',
        link: 'settings',
        roles: ['admin'],
        menu: 'admin',
        icon: 'fa-cog'
    });

    Admin.menus.add({
        title: 'USERS',
        link: 'users',
        roles: ['admin'],
        menu: 'admin',
        icon: 'fa-users'
    });

    Admin.aggregateAsset('css', 'admin.css');
    Admin.aggregateAsset('js', '../lib/ng-clip/src/ngClip.js', {
        absolute: false,
        global: true
    });

    Admin.aggregateAsset('js', '../lib/zeroclipboard/dist/ZeroClipboard.js', {
        absolute: false,
        global: true
    });

    Admin.angularDependencies(['ngClipboard']);

    // We enable routing. By default the Package Object is passed to the routes
    Admin.routes(app, auth, database);
    return Admin;
});