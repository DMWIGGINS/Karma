var chai = require('chai');
var chaiHttp = require('chai-http');
var crud = require('../app/controller/karma_controller');
var should = chai.should();

chai.use(chaiHttp);

// test data entered into mySQL database
// INSERT INTO favors (favor_name, favor_desc, favor_datetime, favor_asker_id, favor_asker_name, favor_completer_name, favor_status, favor_price)
//   VALUES ("Feed my Cat", "I am going away and need someone to feed my cat", "January 30, 2018 02:30 pm", 1 "Doreen", "", "active", 10);
//   ("Pick up my Drycleaning", "Running Late", "January 28, 2018 5:00 pm", 2, 1, "Lauren", "Doreen", "pending", 5),
//   ("Walk my Dog", "Running Late", "January 26, 2018 2:00 pm", 3, 2, "Helen", "Lauren", "completed", 5);
// INSERT INTO user (user_name,  user_karma_koins, fb_user_id)
// VALUES ("Doreen", 50, "testuser1"),
// ("Lauren", 50, "testuser2"),
// ("Helen", 50, "testuser3");

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
        done();
      });
  });
});

describe('favorsDetail', function () {
  it('should list ONE favor on /favorsdetail/ <id> GET', function (done) {
    chai.request(crud)
      .get('/favorsdetail/2')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});

describe('createNewFavor', function () {
  it('should create a SINGLE favor on /api/favor/new POST', function (done) {
    chai.request(crud)
      .post('/api/favor/new')
      .send({
        favor_name: 'Feed my Cat',
        favor_desc: 'I am going away and need someone to feed my cat',
        favor_datetime: 'January 30, 2018 02:30 pm',
        favor_asker_id: 1,
        favor_asker_name: 'Doreen',
        favor_status: 'active',
        favor_price: 10
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.have.property('favor_asker_id');
        res.body.SUCCESS.should.have.property('favor_name');
        res.body.SUCCESS.should.have.property('favor_desc');
        res.body.SUCCESS.should.have.property('favor_price');
        res.body.SUCCESS.should.have.property('favor_datetime');
        res.body.SUCCESS.should.have.property('status');
        res.body.SUCCESS.favor_price.should.equal(10);
        res.body.SUCCESS.favor_asker_name.should.equal('Doreen');
        res.body.SUCCESS.favor_asker_id.should.equal(1);
        res.body.SUCCESS.favor_name.should.equal('Feed my Cat');
        res.body.SUCCESS.favor_desc.should.equal('I am going away and need someone to feed my cat');
        res.body.SUCCESS.favor_status.should.equal('active');
        res.body.SUCCESS.favor_datetime.should.equal('January 30, 2018 02:30 pm');
        done();
      });
  });
});

describe('updateFavor', function () {
  it('should update a SINGLE favor on /api/favorsdetail/ <id> PUT', function (done) {
    chai.request(crud)
      .get('favors')
      .end(function (err, res) {
        chai.request(crud)
          .put('/api/favorsdetail/1')
          .send({
            'favor_status': 'complete'
          })
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('UPDATED');
            response.body.UPDATED.should.be.a('object');
            response.body.UPDATED.should.have.property('_id');
            response.body.UPDATED.favor_status.should.equal('complete');
            done();
          });
      });
  });
});