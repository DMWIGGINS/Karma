var express = require("express");
var db = require("../../models");
var router = express.Router();
var ssn = {};
ssn.currentUser = null;
var askerObject = {};
var completerObject = {};

// Using this variable to track whether the current user is connected via Facebook

//---------------------------------------------------------------------------------
// get the favors to populate the /favors page
//---------------------------------------------------------------------------------
<<<<<<< HEAD
function getFavors() {
    console.log("im in getFavors");
    // var group_id = 1;
=======
function getFavors(req, res) {


>>>>>>> 87639f8fb267aa3bf530cdb04769c9d0f8bcd969
    var activeFavors = [];
    db.Favor.findAll({
        where: {
            favor_status: 'active'
        },
        order: ['createdAt']
    }).then(function (data, err) {
        if (err) {
            // If an error occurred, send a generic server failure

            res.status(500).end();
        } else if (data[0]) {

            var favorObject = [];
            for (let i = 0; i < data.length; i++) {
                favorObject = {
                    id: data[i].id,
                    favor_name: data[i].favor_name,
                    favor_desc: data[i].favor_desc,
                    favor_price: data[i].favor_price,
                    favor_datetime: data[i].favor_datetime,
                    favor_asker_name: data[i].favor_asker_name
                }
                activeFavors.push(favorObject);
                
            }
            res.render("favors", {
                activeFavor: activeFavors
            });
        } else {
            // no rows returned 

            res.render("favors", {
                activeFavor: []
            });
        }
    });
}


//---------------------------------------------------------------------------------
// get the favors to populate the /profile page
//---------------------------------------------------------------------------------
function getProfileFavors(req, res) {

    ssn = req.session;

    var askedPendingFavors = [];
    var givenPendingFavors = [];
    db.Favor.findAll({
        where: {
            favor_status: {
                $ne: 'completed'
            }
        },
        order: ['createdAt']
    }).then(function (data, err) {
        if (data[0]) {
            var askedFavorObject = [];
            var givenFavorObject = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].favor_asker_id == ssn.currentUser.id) {

                    askedFavorObject = {
                        id: data[i].id,
                        favor_name: data[i].favor_name,
                        favor_price: data[i].favor_price,
                        favor_status: data[i].favor_status,
                        favor_datetime: data[i].favor_datetime,
                        favor_completer: data[i].favor_completer_name
                    }
                    askedPendingFavors.push(askedFavorObject)

                }
                if (data[i].favor_completer_id == ssn.currentUser.id) {

                    givenFavorObject = {
                        id: data[i].id,
                        favor_name: data[i].favor_name,
                        favor_price: data[i].favor_price,
                        favor_status: data[i].favor_status,
                        favor_datetime: data[i].favor_datetime,
                        favor_asker_name: data[i].favor_asker_name
                    }
                    givenPendingFavors.push(givenFavorObject);

                }

            }

            res.render("profile", {
                askedPendingFavors: askedPendingFavors,
                givenPendingFavors: givenPendingFavors,
                user: ssn.currentUser
            });
        } else {
            // no rows returned 

            res.render("profile", {
                askedPendingFavors: [],
                givenPendingFavors: [],
                user: ssn.currentUser
            });
        }
    });
}

//---------------------------------------------------------------------------------
// get the favor detail to populate the /favorsdetail page
//---------------------------------------------------------------------------------
function getFavorsDetail(req, res) {

    db.Favor.findAll({
        where: {
            id: req.params.id
        },
    }).then(function (data, err) {

        var favorObject = {};
        if (err) {
            // If an error occurred, send a generic server failure

            res.status(500).end();
        } else if (data[0]) {

            favorObject = {
                id: data[0].id,
                favor_name: data[0].favor_name,
                favor_desc: data[0].favor_desc,
                favor_price: data[0].favor_price,
                favor_datetime: data[0].favor_datetime,
                favor_status: data[0].favor_status,
                favor_asker_id: data[0].favor_asker_id,
                favor_asker_name: data[0].favor_asker_name,
                favor_completer_id: data[0].favor_completer_id,
                favor_completer_name: data[0].favor_completer_name
            }

            res.render("favorsdetail",
                favorObject

            );
        } else {
            // no rows returned 

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


    db.Favor.create({
            favor_name: req.body.favor_name,
            favor_desc: req.body.favor_desc,
            favor_asker_id: req.session.currentUser.id,
            favor_status: "active",
            favor_price: req.body.favor_price,
            favor_datetime: req.body.favor_datetime,
            favor_asker_name: req.session.currentUser.user_name,
            favor_completer_name: null

        })
        .then(function (data, err) {
            if (data) {

                res.status(200).end();
            } else if (err) {
                // If an error occurred, send a generic server failure

                res.status(500).end();
            }
        });
    getFavors(res);
}

//---------------------------------------------------------------------------------
// update a favor on the /favorsdetail page
//---------------------------------------------------------------------------------
function updateFavor(req, res) {

    ssn = req.session;

    var favorId = req.body.id;
    var favorAskerId = req.body.favor_asker_id;


    var favorCompleterId = req.body.favor_completer_id;
    var favorCompleterName = req.body.favor_completer_name;
    
    var favorPrice = req.body.favor_price;

    //when the pending button is clicked, update the favor status to pending
    //and add the favor completer id and name
    //else then complete button was clicked, and you just update the sttus to complete
    //and update the users' karma koins
    //updating the karma koins on the user table can happen asyncronously from updating the favors table
    if (req.body.favor_status == "pending") {

        db.Favor.update({
            favor_completer_id: ssn.currentUser.id,
            favor_completer_name: ssn.currentUser.user_name,
            favor_status: req.body.favor_status
        }, {
            where: {
                id: {
                    $eq: req.body.id
                }
            }
        }).then(function (data, err) {

            if (err) {
                // If an error occurred, send a generic server failure

                res.status(500).end();
            } else if (data[0]) {

                getFavorsDetail(req, res);
                // res.status(200).end();
            }
        });

    } else {

        db.Favor.update({
            favor_status: req.body.favor_status
        }, {
            where: {
                id: {
                    $eq: req.body.id
                }
            }
        }).then(function (data, err) {

            if (err) {
                // If an error occurred, send a generic server failure

                res.status(500).end();
            } else if (data[0]) {

                updateKarmaKoins(favorAskerId, favorCompleterId, favorPrice);
                getFavorsDetail(req, res);

            }
        });

    }
}
//------------------------------------------------------------------------------------------------
// update the karma coins when the favor status is updated to completed on the /favordetail page
//------------------------------------------------------------------------------------------------
function updateKarmaKoins(favorAskerId, favorCompleterId, favorPrice) {

    var asker = parseInt(favorAskerId);
    var completer = parseInt(favorCompleterId);
    db.User.findAll({
        where: {
            $or: [{
                    id: asker
                },
                {
                    id: completer
                }
            ]
        }
    }).then(function (data, err) {
        if (err) {
            // If an error occurred, send a generic server failure

            res.status(500).end();
            var updateKoins = 0;
        } else if (data[0]) {


            for (i = 0; i < data.length; i++) {

                if (data[i].id == asker) {
                    updateKoins = data[i].user_karma_koins - parseInt(favorPrice);

                    askerObject = {
                        "user_karma_koins": updateKoins,
                        "id": asker
                    };

                } else {
                    updateKoins = data[i].user_karma_koins + parseInt(favorPrice);

                    completerObject = {
                        "user_karma_koins": updateKoins,
                        "id": completer
                    };

                }

            }

            db.User.update({
                user_karma_koins: askerObject.user_karma_koins
            }, {
                where: {
                    id: askerObject.id
                }
            }).then(function (data, err) {
                if (err) {
                    // If an error occurred, send a generic server failure

                    res.status(500).end();
                } else if (data[0]) {

                    db.User.update({
                        user_karma_koins: completerObject.user_karma_koins
                    }, {
                        where: {
                            id: completerObject.id
                        }
                    }).then(function (data, err) {
                        if (err) {
                            // If an error occurred, send a generic server failure

                        } else if (data[0]) {

                        }
                    });
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
            db.User.create({
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
                        ssn.currentUser = data;
                        res.status(200).end();
                    }
                });
        }
    });

}

function updateCurrentUser(req, res) {
    db.User.findAll({
        where: {
            id: ssn.currentUser.id
        }
    }).then(function (data, err) {
        if (data[0]) {
            ssn.currentUser = data[0];
            getProfileFavors(req, res);
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
    createNewUser(req, res);
});


//--------------------------------------
// Route for the profile page
//--------------------------------------
router.get("/profile", function (req, res) {
    ssn = req.session;
    updateCurrentUser(req, res);
});


//--------------------------------------
// Route for the favors page
//--------------------------------------
router.get("/favors", function (req, res) {
    ssn = req.session;
    getFavors();
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
// / Route for the favors detail page
//--------------------------------------
router.get("/favorsdetail/:id", function (req, res) {
    ssn = req.session;
    getFavorsDetail(req, res);
});



//--------------------------------------
// Route to update a favor from the
// favordetail page
//--------------------------------------
router.put("/api/favorsdetail/", function (req, res) {
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