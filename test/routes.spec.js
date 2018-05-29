const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server');

chai.use(chaiHttp);

describe('Api endpoints', () => {

  beforeEach(done => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => {
            return database.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  describe('GET /api/v1/states', () => {
    it('should return states', done => {
      chai
        .request(app)
        .get('/api/v1/states')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          done();
        });
    });
  });

  describe('GET /api/v1/states/:state_id/diseases/:disease_id', () => {
    it('should return the id if a state id and disease id is given', done => {
      chai
        .request(app)
        .get('/api/v1/states/1/diseases/1')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body[0].should.have.property('id');
          done();
        });
    });

    it('should return an error if either the state or disease id does not exist', done => {
      chai
        .request(app)
        .get('/api/v1/states/1/diseases/5')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(404);
          response.body.should.have.property('message');
          response.body.message.should.equal('Cannot find disease or state id');
          done();
        });
    });

    it('should return an error if id is invalid', done => {
      chai
        .request(app)
        .get('/api/v1/states/1/diseases/hello')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(500);
          response.body.should.have.property('message');
          response.body.should.have.property('err');
          response.body.message.should.equal('Invalid Id');
          done();
        });
    });
  });

  describe('/api/v1/specific-disease/:id', () => {
    it('should return all of a specific disease', done => {
      chai
        .request(app)
        .get('/api/v1/specific-disease/1')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body[0].should.have.property('id');
          done();
        });
    });

    it('should return an error if disease id does not exist', done => {
      chai
        .request(app)
        .get('/api/v1/specific-disease/5')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(404);
          response.body.should.have.property('message');
          response.body.message.should.equal('Cannot find disease id');
          done();
        });
    });

    it('should return an error if id is invalid', done => {
      chai
        .request(app)
        .get('/api/v1/specific-disease/hello')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(500);
          response.body.should.have.property('message');
          response.body.should.have.property('err');
          response.body.message.should.equal('Invalid Id');
          done();
        });
    });
  });

  describe('/api/v1/state-diseases/:id', () => {
    it('should return all of a specific states', done => {
      chai
        .request(app)
        .get('/api/v1/state-diseases/1')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body[0].should.have.property('id');
          done();
        });
    });

    it('should return an error if state id does not exist', done => {
      chai
        .request(app)
        .get('/api/v1/state-diseases/53')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(404);
          response.body.should.have.property('message');
          response.body.message.should.equal('Cannot find state id');
          done();
        });
    });

    it('should return an error if id is invalid', done => {
      chai
        .request(app)
        .get('/api/v1/state-diseases/hello')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(500);
          response.body.should.have.property('message');
          response.body.should.have.property('err');
          response.body.message.should.equal('Invalid Id');
          done();
        });
    });
  });


});
