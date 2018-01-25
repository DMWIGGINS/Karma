var assert = require("chai").assert;
var expect = require("chai").expect;
var should = require("chai").should;

var controller = require("../app/controller/karma_controller");
var db = require("./models");
var express = require("express");
var db = require("../models");
var router = express.Router();
var ssn = {};
ssn.currentUser = null;

var config = require('../config/config.json');

var connection = require("./connection);")

function updateKarmaKoins(favorAskerId, favorCompleterId, favorPrice) {
  console.log("im in updateKarmaKoins");
  var askerObject = {};
  var completerObject = {};
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
      console.log("an error occurred");
      console.log(err);
      res.status(500).end();
      var updateKoins = 0;
    } else if (data[0]) {
      console.log("i got data returned");
      // console.log(data);
      for (i = 0; i < data.length; i++) {
        console.log("asker" + asker);
        console.log("COMPLETER" + completer);
        if (data[i].id == asker) {
          updateKoins = data[i].user_karma_koins - parseInt(favorPrice);
          console.log("asker " + asker);
          console.log(updateKoins);
          askerObject = {
            "user_karma_koins": updateKoins,
            "id": asker
          };
          console.log("askerObject " + JSON.stringify(askerObject));
        } else {
          updateKoins = data[i].user_karma_koins + parseInt(favorPrice);
          console.log("completer " + completer);
          console.log(updateKoins);
          completerObject = {
            "user_karma_koins": updateKoins,
            "id": completer
          };
          console.log("completerObject " + JSON.stringify(completerObject));
        }

      }
      console.log("im out of the for loop");
      console.log("asker koins " + askerObject.updateKoins);
      console.log("askerObject " + JSON.stringify(askerObject));
      db.User.update({
        user_karma_koins: askerObject.user_karma_koins
      }, {
        where: {
          id: askerObject.id
        }
      }).then(function (data, err) {
        if (err) {
          // If an error occurred, send a generic server failure
          console.log("an error occurred");
          console.log(err);
          res.status(500).end();
        } else if (data[0]) {
          console.log("asker user is updated");
          console.log("completer koins " + completerObject.updateKoins);
          db.User.update({
            user_karma_koins: completerObject.user_karma_koins
          }, {
            where: {
              id: completerObject.id
            }
          }).then(function (data, err) {
            if (err) {
              // If an error occurred, send a generic server failure
              console.log("an error occurred");
              console.log(err);
            } else if (data[0]) {
              console.log("completer user is updated");
            }
          });
        }
      });
    }
  });
  return completerObject;
}

describe("updateKarmaKoins", function () {
  it("should update the asker and the completer koins", function () {
    expect(updateKarmaKoins(1, 2, 10)).to.be.an('object');
  });
});