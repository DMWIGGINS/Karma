var assert = require("chai").assert;
var expect = require("chai").expect;
var should = require("chai").should;

var controller = require("../app/controller/karma_controller");
var express = require("express");
var db = require("../models");
var router = express.Router();
var ssn = {};
ssn.currentUser = null;

var config = require('../config/config.json');
var server = require("../server.js");
var connection = require("./connection");

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    describe('Favors', function () {
        // Favor.collection.drop();
        // beforeEach(function (done) {
        //     var newFavor = new Favor({
        //         favor_name: "Walk my dog",
        //         favor_desc: "I need someone to walk my dog",
        //         favor_datetime: "January 30, 2018",
        //         favor_asker_id: 1,
        //         favor_completer_id: null,
        //         favor_asker_name: "MICKEY Mouse",
        //         favor_completer_name: null,
        //         favor_status: "active",
        //         favor_price: 10
        //     });
        //     newFavor.save(function (err) {
        //         done();
        //     });
        // });
        // afterEach(function (done) {
        //     Favor.collection.drop();
        //     done();
        // });

        //get all
        it('should list ALL favors on /favors GET', function (done) {
            chai.request(server)
                .get('/favors')
                .end(function (err, res) {
                    console.log("res");
                    console.log(res);
                    res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    // res.body[0].should.have.property('id');
                    // res.body[0].should.have.property('favor_name');
                    // res.body[0].should.have.property('favor_desc');
                    // res.body[0].favor_name.should.equal('walk my dog');
                    // res.body[0].favor_status.should.equal('active');
                    done();
                });
        });

        //   connection.end();
    });

});