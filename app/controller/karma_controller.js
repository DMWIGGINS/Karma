var express = require("express");
var db = require("../../models");
var router = express.Router();
var ssn ;


// Using this variable to track whether the current user is connected via Facebook


// favor_karma_koin_price
// favor_description
function getFavors(req, res) {
    var group_id = 1;
    var activeFavors = [];
    db.Favor.findAll({
        where: {
            GroupId: group_id,
            favor_status: 'active'
        },
        order: ['createdAt']
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
                    id: data[i].id,
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

function createNewFavor(req, res) {
    console.log("IM IN CREATE NEW FAVOR");
    var group_id = 1;
    db.Favor.create({
            favor_name: req.body.favor_name,
            favor_desc: req.body.favor_desc,
            favor_asker_id: req.body.favor_asker_id,
            favor_status: "active",
            favor_price: req.body.favor_price,
            favor_datetime: req.body.favor_datetime,
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


function updateFavor(req, res) {
    console.log("Im in UpdateFavor now on the server side");
    console.log(req.params);
    console.log(req.body);
    console.log("going to do the update now");
    db.Favor.update({
        favor_completer_id: req.body.favor_completer_id,
        favor_status: req.body.favor_status
    }, {
        where: {
            id: req.params.id
        }
    });
}


// Default route for the landing page
router.get("/", function (req, res) {
    ssn=req.session;
    res.render("landing");
});

// Route for the about section
router.get("/about", function (req, res) {
    ssn=req.session;
    res.render("about");
});

// Route for the favors page
router.get("/favors", function (req, res) {
    ssn=req.session;
    getFavors(req, res);
});

router.post("/api/favor/new", function (req, res) {
    ssn=req.session;
    createNewFavor(req, res);
});

router.put("/api/favor/:id", function (req, res) {
    ssn=req.session;
    updateFavor(req, res);
});

// Route for the profile page
router.get("/profile", function (req, res) {
    ssn=req.session;
    res.render("profile", {
        // Passing the current user from the server to the client (for handlebars model)
        user: ssn.currentUser
    });
});

// Route that creates new users
router.post("/api/user/create", function (req, res) {
    ssn=req.session;
    // Once the client calls the above route, invoke the createNewUser function passing in the request and the response
    createNewUser(req, res)
});

// Function that creates new users
function createNewUser(req, res) {
    // First, see if the current connected user exists in our DB.
    db.User.findAll({
        // Take the fb user id of the currently connected user and see if it matches a fb user id in our db.
        where: {
            fb_user_id: req.body.fb_user_id
        }
    }).then(function (data, err) {
        // FIXME: When the user table doesn't initially exist, and the first user connects, an error is being thrown because there is no table.
        // if (err) {
        //     res.status(500).end();
        // } 
        // If a row is returned, that fb user id alraedy exists in the db
        if (data[0]) {
            ssn.currentUser = data[0];
            res.status(200).end();
            // FIXME: This isn't working... It should redirect the user to the profile page if their user exists in the db.
            // res.render("profile", {
            //     user: currentUser
            // });
        } else {
            // If no rows are returned take the body data from the client, create a new user, and send it to the db
            ssn.currentUser = db.User.create({
                    user_name: req.body.user_name,
                    user_email: req.body.user_email,
                    profile_pic_link: req.body.fb_user_pic,
                    fb_user_id: req.body.fb_user_id,
                    user_karma_koins: 50
                })
                .then(function (data, err) {
                    if (err) {
                        // If an error occurred, send a generic server failure
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                        // FIXME: This isn't working... It should redirect the user to the profile page if their user exists in the db.
                        // res.render("profile", {
                        //     user: currentUser
                        // });
                    }
                });
        }
    });

}



// Export routes for server.js to use.
module.exports = router;