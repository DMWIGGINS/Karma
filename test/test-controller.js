var assert = require("chai").assert;
var expect = require("chai").expect;
var should = require("chai").should;

var controller = require("../app/controller/karma_controller");

var express = require("express");
var db = require("../models");
var router = express.Router();
var ssn = {};
ssn.currentUser = null;

//------------------------------------------------------------------------------------------------
// update the karma coins when the favor status is updated to completed on the /favordetail page
//------------------------------------------------------------------------------------------------
function updateKarmaKoins(favorAskerId, favorCompleterId, favorPrice) {
  console.log("im in updateKarmaKoins");
  db.User.findAll({
    where: {

      $or: {
        id: favorAskerId,
        id: favorCompleterId
      }
    }
  }).then(function (data, err) {
    var updateKoins = '';
    var dbObject = {};
    if (err) {
      // If an error occurred, send a generic server failure
      console.log("an error occurred");
      console.log(err);
      res.status(500).end();

    } else if (data[0]) {
      for (i = 0; i < data.length; i++) {
        if (data[i] == favorAskerId) {
          updateKoins = data[i].user_karma_koins - parseInt(favorPrice);
          var dbObject = [];
          dbObject.push(
            {user_karma_koins: updateKoins}, 
            {where: {id: favorAskerId}})
          
        } else {
          updateKoins = data[i].user_karma_koins + parseInt(favorPrice);
          var dbObject = [];
          dbObject.push({user_karma_koins: updateKoins}, 
            {where: {id: favorCompleterId}});
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
  }
});
}


describe("updateKarmaKoins", function () {
  it("should update the asker and the completer koins", function () {
    expect(updateKarmaKoins(1, 2, 10)).to.be.an('object');
  });
});