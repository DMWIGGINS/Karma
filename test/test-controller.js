
var assert = require("chai").assert;
var expect = require("chai").expect;
var should = require("chai").should;

var expect = require("./app/controller/karma_controller");

describe("getFavors", function () {
  it("should return the favors from the database", function () {
    expect(getFavors().to.equal(8);
  });