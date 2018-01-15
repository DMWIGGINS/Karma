var express = require("express");

var router = express.Router();

var db = require("../../models");

// favor_karma_koin_price
// favor_description
function getFavors(req, res) {
    var group_id = 1;
    var activeFavors = [];
    db.Favor.findAll({
            where: {
                GroupId: group_id,
                favor_status: 'active'
            }
        }).then(function (data, err) {
                if (err) {
                    // If an error occurred, send a generic server failure
                    console.log("an error occurred");
                    console.log(err);
                    res.status(500).end();
                } else if (data[0]) {
                    console.log("about to dump favors");
                    console.log("data" + JSON.stringify(data));
                    console.log("description " + data[0].favor_description);
                    console.log("koins " + data[0].favor_karma_koin_price);
                    console.log("data is returned");
                    console.log("data length " + data.length);
                    var favorObject = [];
                    for (let i = 0; i < data.length; i++) {
                        favorObject = {
                            favor_description: data[i].favor_description,
                            favor_karma_koin_price: data[i].favor_karma_koin_price
                        }
                        activeFavors.push(favorObject);
                    }
                    res.render("favors", {
                        activeFavor: activeFavors
                    });
                } else {
                    // no rows returned 
                    console.log("no rows returned");
                    res.render("favors", {
                        activeFavor: []
                    });
                }
            });
        }


            // Create all our routes and set up logic within those routes where required.
            router.get("/", function (req, res) {
                res.render("landing");
            });

            router.get("/about", function (req, res) {
                res.render("about");
            });

            router.get("/favors", function (req, res) {
                getFavors(req, res);
            });

            router.get("/signedin", function (req, res) {
                res.render("signedin");
            });

            router.get("/profile", function (req, res) {
                res.render("profile");
            });

            // Export routes for server.js to use.
            module.exports = router;