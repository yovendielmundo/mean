'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
    menusPath = process.cwd() + '/mean.json';;

module.exports = function(Menus) {

    return {
        /**
         * get menus from mean.json
         */
        get: function(req, res, next) {
            fs.readFile(menusPath, function(err, data) {
                if (err) return next();
                var obj = JSON.parse(data);
                req.menus = obj.menus;
                next();
            });
        }
    }
};