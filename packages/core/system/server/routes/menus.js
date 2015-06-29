'use strict';

var mean = require('meanio');

module.exports = function(System, app, auth, database) {

    var menus = require('../controllers/menus')(System);

    app.route('/api/admin/menu/:name')
        .get(menus.get, function(req, res) {
            var roles = req.user ? JSON.parse(JSON.stringify(req.user.roles)) : ['anonymous'],
                menu = req.params.name || 'main',
                defaultMenu = [],
                settings = req.query.settings,
                itemsRes = [],
                tmpMenu;

            if (settings && roles.indexOf('admin') !== -1) roles.push('all');

            if (!Array.isArray(defaultMenu)) defaultMenu = [defaultMenu];
            if (req.menus && req.menus.add && req.menus.add[menu]) {
                for (var k = 0; k < req.menus.add[menu].length; k++) {
                    defaultMenu.push(JSON.stringify(req.menus.add[menu][k]));
                }
            }

            var items = mean.menus.get({
                roles: roles,
                menu: menu,
                defaultMenu: defaultMenu.map(function(item) {
                    return JSON.parse(item);
                })
            });

            if (!settings && req.menus && req.menus.remove && req.menus.remove[menu]) {
                for (var k = 0; k < req.menus.remove[menu].length; k++) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].name === req.menus.remove[menu][k].name)
                            items.splice(i, 1);
                    }
                }
            }

            if (req.menus && req.menus.update && req.menus.update[menu]) {
                for (var k = 0; k < req.menus.update[menu].length; k++) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].name === req.menus.update[menu][k].name)
                            items[i] = req.menus.update[menu][k];
                    }
                }
            }

            if (settings && req.menus && req.menus.remove && req.menus.remove[menu]) {
                for (var k = 0; k < req.menus.remove[menu].length; k++) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].name === req.menus.remove[menu][k].name)
                            items[i].disable = true;
                    }
                }
            }


            return res.json(items);

        });
};