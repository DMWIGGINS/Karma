
var assert = require("chai").assert;
var expect = require("chai").expect;
var should = require("chai").should;

var expect = require("./app/controller/karma_controller");

describe("getFavors(req, res)", function () {
  it("should return the favors from the database", function () {
    expect(getFavors(req, res)).to.equal(8);
  });

  it("should throw when not passed numbers", function () {
    expect(function () {
      multiply(2, "4");
    }).to.throw(Error);
  });
});

db.get(1234, function (err, doc) {
    should.not.exist(err);
    should.exist(doc);
    doc.should.be.an('object');
  });

  db.Favor.findAll({
    where: {
        GroupId: group_id,
        favor_status: 'active'
    },
    order: ['createdAt']