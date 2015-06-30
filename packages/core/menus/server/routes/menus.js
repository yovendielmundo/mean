'use strict';
var fs = require('fs'),
  menusPath = process.cwd() + '/mean.json';

// var mean = require('meanio');
// console.log(mean);

module.exports = function(Menus, app, auth, database) {
  var menus = require(process.cwd() + '/packages/core/system/server/controllers/menus')(Menus);

  app.route('/api/admin/menus')
    .get(auth.requiresAdmin, menus.get, function(req, res) {
      res.json(req.menus);
    })
    .put(auth.requiresAdmin, function(req, res) {
      // var txt = '\'use strict\';module.exports = ' + JSON.stringify(req.body);
      var addToObj = function(menus, action, key, value) {
        var exists = false;
        if (action === 'update' && menus.add && menus.add[key]) {
          for (var i = 0; i < menus.add[key].length; i++) {
            if (menus.add[key][i].name === value.name) {
              menus.add[key][i] = value;
              exists = true;
              break;
            }
          }
        }
        if (!exists) {
          for (var i = 0; i < menus[action][key].length; i++) {
            if (menus[action][key][i].name === value.name) {
              menus[action][key][i] = value;
              exists = true;
              break;
            }
          }
          if (!exists)
            menus[action][key].push(value);
        }
      }

      fs.readFile(menusPath, function(err, data) {
        if (err) throw err;

        var obj = JSON.parse(data);

        if (req.body.action === 'enable') {

          if (obj.menus.remove && obj.menus.remove[req.body.key]) {
            for (var i = 0; i < obj.menus.remove[req.body.key].length; i++) {
              if (obj.menus.remove[req.body.key][i].name === req.body.value.name) {
                obj.menus.remove[req.body.key].splice(i, 1);
                break;
              }
            }
          }

        } else {

          if (!obj.menus) obj.menus = {};

          if (!obj.menus[req.body.action]) obj.menus[req.body.action] = {};

          if (!obj.menus[req.body.action][req.body.key]) obj.menus[req.body.action][req.body.key] = [];
          if (req.body.value instanceof Array) {
            for (var i = 0; i < req.body.value.length; i++) {
              addToObj(obj.menus, req.body.action, req.body.key, req.body.value[i]);
            }
          } else
            addToObj(obj.menus, req.body.action, req.body.key, req.body.value);
        }
        // if (err) return res.json({});
        fs.writeFile(menusPath, JSON.stringify(obj), function(err) {
          if (err) throw err;
          res.json(true);
        });
      });

    });
};