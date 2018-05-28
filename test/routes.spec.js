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
          done();
        });
    });
  });


});
