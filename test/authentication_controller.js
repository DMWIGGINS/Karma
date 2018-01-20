"use strict";

var authentication = require('../api/controllers').authentication,
    db = require('../db/models'),
        ResponseFactory = require('.util/ResponseFactory');

        module.exports = {
            setUp: function (callback) {
                db.sequelize.authenticate()
                .then(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        db.sequelize.sync()
                        .then(function () {
                            callback();
                        });
                    }
                });
            }
        }