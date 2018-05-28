const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, db } = require('../server');

chai.use(chaiHttp);

describe('client routes', () => {
  it('should return the homepage', done => {
    chai
      .request(app)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });

  it('should return 404 for a route that does not exist', done => {
    chai
      .request(app)
      .get('/bottle')
      .end((error, response) => {
        response.should.status(404);
        done();
      });
  });
});
