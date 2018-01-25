var chai = require('chai');
var chaiHttp = require('chai-http');
var crud = require('../app/controller/karma_controller');
var should = chai.should();

chai.use(chaiHttp);



describe('getFavors', function () {
  it('should list ALL favors on /favors GET', function (done) {
    chai.request(crud)
      .get('/favors')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('favor_name');
        res.body[0].should.have.property('favor_desc');
        res.body[0].should.have.property('favor_price');
        res.body[0].should.have.property('favor_datetime');
        setTimeout(done, 5000);
      });
  });
});

describe('favorsDetail', function () {
  it('should list ONE favor on /favorsdetail/:id GET', function (done) {
    chai.request(crud)
      .get('/favorsdetail/:id')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        setTimeout(done, 5000);
      });
  });
});
describe('createNewFavor', function () {
  it('should create a SINGLE favor on /api/favor/new POST', function (done) {
    chai.request(crud)
      .post('/api/favor/new')
      .end(function (err, res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('favor_name');
        res.body[0].should.have.property('favor_desc');
        res.body[0].should.have.property('favor_price');
        res.body[0].should.have.property('favor_datetime');
        res.body[0].favor_completer_name.should.equal(null);
        done();
      });
  });
});
describe('updateFavor', function () {
  it('should update a SINGLE favor on /api/favorsdetail PUT', function (done) {
    chai.request(crud)
      .put('/api/favorsdetail')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});