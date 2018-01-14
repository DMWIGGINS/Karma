var express = require("express");

var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    res.render("landing");
});

router.get("/about", function (req, res) {
    res.render("about");
});

router.get("/favors", function (req, res) {
    res.render("favors");
});

router.get("/signedin", function (req, res) {
    res.render("signedin");
});

router.get("/profile", function (req, res) {
    res.render("profile");
});

// Export routes for server.js to use.
module.exports = router;