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
                    console.log("name " + data[0].favor_name);
                    console.log("koins " + data[0].favor_price);
                    console.log("data is returned");
                    console.log("data length " + data.length);
                    var favorObject = [];
                    for (let i = 0; i < data.length; i++) {
                        favorObject = {
                            favor_name: data[i].favor_name,
                            favor_price: data[i].favor_price
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

        function createNewFavor(req, res){
            console.log("IM IN CREATE NEW FAVOR");
            var group_id = 1;
            db.Favor.create({
                favor_name: req.body.favor_name,
                favor_desc: req.body.favor_desc,
                favor_asker_id: req.body.favor_asker_id,
                favor_status: "active",
                favor_price: req.body.favor_price,
                GroupId: group_id
            })
            .then(function (data, err) {
                if (err) {
                    // If an error occurred, send a generic server failure
                    console.log(err);
                    res.status(500).end();
                } else {
                    console.log(data);
                    res.status(200).end();
                }
            });
            getFavors(res);
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

            router.post("/api/favors", function (req, res) {
                console.log("im in api/favors about to create a favor");
                createNewFavor(req, res);
            });

            router.get("/signedin", function (req, res) {
                res.render("signedin");
            });

            router.get("/profile", function (req, res) {
                res.render("profile");
            });

            // Export routes for server.js to use.
            module.exports = router;