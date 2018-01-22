var express = require("express");
var db = require("../../models");
var router = express.Router();
var ssn = {};
ssn.currentUser = null;


// Using this variable to track whether the current user is connected via Facebook


// favor_karma_koin_price
// favor_description
//---------------------------------------------------------------------------------
// get the favors to populate the /favors page
//---------------------------------------------------------------------------------
function getFavors(req, res) {
    // var group_id = 1;
    var activeFavors = [];
    db.Favor.findAll({
        where: {
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
            console.log("date and time" + data[0].favor_datetime);
            console.log("data is returned");
            console.log("data length " + data.length);
            var favorObject = [];
            for (let i = 0; i < data.length; i++) {
                favorObject = {
                    id: data[i].id,
                    favor_name: data[i].favor_name,
                    favor_desc: data[i].favor_desc,
                    favor_price: data[i].favor_price,
                    favor_datetime: data[i].favor_datetime
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
//getting the user pending asked and given favors for the profile page.

//---------------------------------------------------------------------------------
// get the favors to populate the /profile page
//---------------------------------------------------------------------------------
function getProfileFavors(req, res) {
    ssn = req.session;
    var askedPendingFavors = [];
    var givenPendingFavors = [];
    db.Favor.findAll({
        where: {
            // favor_asker_id: ssn,
            $or: {
                favor_status: 'active',
                favor_status: 'pending'
            },
        },
        order: ['createdAt']
    }).then(function (data, err) {
        if (data[0]) {
            console.log("about to dump favors");
            console.log("data" + JSON.stringify(data));
            console.log("name " + data[0].favor_name);
            console.log("koins " + data[0].favor_price);
            console.log("data is returned");
            console.log("data length " + data.length);
            var askedFavorObject = [];
            var givenFavorObject = [];
            console.log("data[i].favor_asker_id " + data[0].favor_asker_id);
            console.log("data[i].favor_completer_id " + data[0].favor_completer_id);
            console.log(ssn);
            console.log("ssn.currentUser " + JSON.stringify(ssn.currentUser));
            ssn.currentUser
            for (let i = 0; i < data.length; i++) {
                console.log("im inside the for loop");
                console.log("ssn.currentUser " + JSON.stringify(ssn.currentUser));
                if (data[i].favor_asker_id == ssn.currentUser.id) {
                    console.log("im inside the if inside the for loop");
                    askedFavorObject = {
                        id: data[i].id,
                        favor_name: data[i].favor_name,
                        favor_price: data[i].favor_price,
                        favor_status: data[i].favor_status
                    }
                    askedPendingFavors.push(askedFavorObject)
                }
                if (data[i].favor_completer_id == ssn.currentUser.id) {
                    console.log("im inside the second  if inside the for loop");
                    givenFavorObject = {
                        id: data[i].id,
                        favor_name: data[i].favor_name,
                        favor_price: data[i].favor_price,
                        favor_status: data[i].favor_status
                    }
                    givenPendingFavors.push(givenFavorObject);
                }

            }
            console.log("askedPendingFavors= " + JSON.stringify(askedPendingFavors));
            console.log("givenPendingFavors= " + JSON.stringify(givenPendingFavors));
            res.render("profile", {
                askedPendingFavors: askedPendingFavors,
                givenPendingFavors: givenPendingFavors,
                user: ssn.currentUser
            });
        } else {
            // no rows returned 
            console.log("no rows returned");
            res.render("profile", {
                askedPendingFavors: [],
                givenPendingFavors: [],
                user: ssn.currentUser
            });
        }
    });
}

//---------------------------------------------------------------------------------
// get the favor detail to populate the /favordetail page
//---------------------------------------------------------------------------------
function getFavorsDetail(req, res) {
    console.log("id " + req.params.id);
    db.Favor.findAll({
        where: {
            id: req.params.id
        },
    }).then(function (data, err) {
        console.log(data);
        console.log(err);
        if (err) {
            // If an error occurred, send a generic server failure
            console.log("an error occurred");
            console.log(err);
            res.status(500).end();
        } else if (data) {
            console.log("data" + JSON.stringify(data));
            console.log("data is returned");
            var favorObject = {
                id: data[0].favor_id,
                favor_name: data[0].favor_name,
                favor_desc: data[0].favor_desc,
                favor_price: data[0].favor_price,
                favor_datetime: data[0].favor_datetime
            }
            console.log(favorObject);
            res.render("favorsdetail",
                favorObject

            );
        } else {
            // no rows returned 
            console.log("no rows returned");
            res.render("favorsdetail", {
                favorObject
            });
        }
    });
}

//---------------------------------------------------------------------------------
// insert a new favor into the database from the /favors page
//---------------------------------------------------------------------------------
function createNewFavor(req, res) {
    console.log("IM IN CREATE NEW FAVOR");
    // var group_id = 1;
    db.Favor.create({
            favor_name: req.body.favor_name,
            favor_desc: req.body.favor_desc,
            favor_asker_id: req.body.favor_asker_id,
            favor_status: "active",
            favor_price: req.body.favor_price,
            favor_datetime: req.body.favor_datetime

        })
        .then(function (data, err) {
            if (data) {
                console.log(data);
                res.status(200).end();
            } else if (err) {
                // If an error occurred, send a generic server failure
                console.log(err);
                res.status(500).end();
            }
        });
    getFavors(res);
}

//---------------------------------------------------------------------------------
// update a favor on the /favordetail page
//---------------------------------------------------------------------------------
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
    }).then(function (data, err) {
        if (err) {
            // If an error occurred, send a generic server failure
            console.log("an error occurred");
            console.log(err);
            res.status(500).end();
        } else if (data[0]) {
            console.log("favor is updated");
            res.status(200).end();
        }
    });
}

//------------------------------------------------------------------------------------------------
// update the karma coins when the favor status is updated to completed on the /favordetail page
//------------------------------------------------------------------------------------------------
function updateKarmaKoins(favorAskerId, favorCompleterId, favorPrice) {
    db.User.findAll({
        where: {

            $or: {
                id: favorAskerId,
                id: favorCompleterId
            }
        }
    }).then(function (data, err) {
        if (err) {
            // If an error occurred, send a generic server failure
            console.log("an error occurred");
            console.log(err);
            res.status(500).end();
            var updateKoins = '';
            var dbObject = {};
        } else if (data[0]) {
            for (i = 0; i < data.length; i++) {
                if (data[i] == favorAskerId) {
                    updateKoins = data[i].user_karma_koins - parseInt(favorPrice);
                    dbObject.push({
                        user_karma_koins: updateKoins
                    }, {
                        where: {
                            id: favorAskerId
                        }
                    });
                } else {
                    updateKoins = data[i].user_karma_koins = parseInt(favorPrice);
                    dbObject.push({
                        user_karma_koins: updateKoins
                    }, {
                        where: {
                            id: favorCompleterId
                        }
                    });
                }

            }
            console.log("dbObject = " + JSON.stringify(dbObject));
            db.User.update({
                dbObject
            }).then(function (data, err) {
                if (err) {
                    // If an error occurred, send a generic server failure
                    console.log("an error occurred");
                    console.log(err);
                    res.status(500).end();
                } else if (data[0]) {
                    console.log("favor is updated");
                    res.status(200).end();
                }
            });
        }
    });
}

//------------------------------------------------------------------------------------------------
// Function that creates new user from the /landing page
//------------------------------------------------------------------------------------------------
function createNewUser(req, res) {
    // First, see if the current connected user exists in our DB.
    db.User.findAll({
        // Take the fb user id of the currently connected user and see if it matches a fb user id in our db.
        where: {
            fb_user_id: req.body.fb_user_id
        }
    }).then(function (data, err) {
        // If a row is returned, that fb user id alraedy exists in the db
        if (data[0]) {
            ssn.currentUser = data[0];
            res.status(200).end();
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
                    }
                });
        }
    });

}


//--------------------------------------
// Default route for the landing page
//--------------------------------------
router.get("/", function (req, res) {
    ssn = req.session;
    res.render("landing");
});


//--------------------------------------
// Route for the landing page
//--------------------------------------
router.get("/landing", function (req, res) {
    ssn = req.session;
    res.render("landing");
});

//--------------------------------------
// Route that creates new users from
// the landing page
//--------------------------------------
router.post("/api/user/create", function (req, res) {
    ssn = req.session;
    // Once the client calls the above route, invoke the createNewUser function passing in the request and the response
    createNewUser(req, res)
});


//--------------------------------------
// Route for the profile page
//--------------------------------------
router.get("/profile", function (req, res) {
    ssn = req.session;
    getProfileFavors(req, res);
});


//--------------------------------------
// Route for the favors page
//--------------------------------------
router.get("/favors", function (req, res) {
    ssn = req.session;
    getFavors(req, res);
});


//--------------------------------------
// / Route for the favors detail page
//--------------------------------------
router.get("/favorsdetail/:id", function (req, res) {
    ssn = req.session;
    getFavorsDetail(req, res);
});


//--------------------------------------
// Route to add a new favor from the
// favors page
//--------------------------------------
router.post("/api/favor/new", function (req, res) {
    ssn = req.session;
    createNewFavor(req, res);
});


//--------------------------------------
// Route to update a favor from the
// favordetail page
//--------------------------------------
router.put("/api/favor/:id", function (req, res) {
    ssn = req.session;
    updateFavor(req, res);
});



//--------------------------------------
// Route for the about section
//--------------------------------------
router.get("/about", function (req, res) {
    ssn = req.session;
    res.render("about", {
        user: ssn.currentUser
    });
    res.render("about");
});

//--------------------------------------
// Route for logout functionality
//--------------------------------------
router.post("/api/user/logout", function (req, res) {
    ssn = req.session;
    ssn.currentUser = null;
    res.status(200).end();
});

//--------------------------------------
// Export routes for server.js to use.
//--------------------------------------
module.exports = router;