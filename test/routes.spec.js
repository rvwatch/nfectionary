const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the home page', done => {
    chai
      .request(app)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });

  it('should return a 404 for a route that does not exist', done => {
    chai
      .request(app)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('Api endpoints', () => {
  let token;
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
      token = jwt.sign({
        email: 'r@turing.io',
        name: 'nfectionary'
      }, app.get('secretKey'));
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

  describe('PUT /api/v1/states/:state_id/diseases/:disease_id', () => {
    it('should update a case count', (done) => {
      chai
        .request(app)
        .put('/api/v1/states/1/diseases/1')
        .set('token', token)
        .send({ diseases_id: 1, states_id: 1, case_count: 20 })
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('state case count updated');
          done();
        });
    });

    it('should return an error if invalid ids provided when updating case count', (done) => {
      chai
        .request(app)
        .put('/api/v1/states/1/diseases/hello')
        .set('token', token)
        .send({ diseases_id: 'invalid', states_id: 1, case_count: 20 })
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(500);
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.should.have.property('error');
          response.body.message.should.equal('Failed to update case count data');
          done();
        });
    });
  });

  describe('GET /api/v1/specific-disease/:id', () => {
    it('should return all case counts at that specific disease', done => {
      chai
        .request(app)
        .get('/api/v1/specific-disease/1')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('diseases_id');
          response.body[0].should.have.property('states_id');
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

  describe('GET /api/v1/state-diseases/:id', () => {
    it('should return all of a specific states', done => {
      chai
        .request(app)
        .get('/api/v1/state-diseases/1')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('diseases_id');
          response.body[0].should.have.property('states_id');
          response.body[0].should.have.property('case_count');
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

  describe('GET /api/v1/diseases', () => {
    it('should return diseases', done => {
      chai
        .request(app)
        .get('/api/v1/diseases')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('treatment');
          response.body[0].should.have.property('signs_symptoms');
          response.body[0].should.have.property('preventative_measures');
          response.body[0].should.have.property('testing_procedures');
          response.body[0].should.have.property('images');
          response.body[0].should.have.property('transmission');
          response.body[0].should.have.property('summary');
          done();
        });
    });
  });

  describe('GET /api/v1/diseases/:id', () => {
    it('should return a specific disease', done => {
      chai
        .request(app)
        .get('/api/v1/diseases/1')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('id');
          response.body.should.have.property('name');
          response.body.name.should.equal('Influenza');
          response.body.should.have.property('treatment');
          response.body.should.have.property('signs_symptoms');
          response.body.should.have.property('preventative_measures');
          response.body.should.have.property('testing_procedures');
          response.body.should.have.property('images');
          response.body.should.have.property('transmission');
          response.body.should.have.property('summary');
          done();
        });
    });

    it('should return an error if state id does not exist', done => {
      chai
        .request(app)
        .get('/api/v1/diseases/15')
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
        .get('/api/v1/diseases/hello')
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

  describe('POST /api/v1/diseases', () => {
    it('should return an id if posting a disease is successful', (done) => {
      chai
        .request(app)
        .post('/api/v1/diseases')
        .set('token', token)
        .send({
          name: 'Malaria',
          treatment: 'Avoid mosquitos',
          images:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCEgmwK5csc-zS9mjR8qRREhaW_Z1jRaLP8_dkr6K5qjuCj31byA',
          signs_symptoms: 'anemia',
          preventative_measures: 'avoid mosquito infected areas',
          testing_procedures: 'blood smear',
          transmission: 'Anophiles Mosquito',
          summary: 'Malaria is bad'
        })
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(201);
          response.body.should.be.an('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(9);
          done();
        });
    });

    it('should return an error if invalid body supplied when posting', (done) => {
      chai
        .request(app)
        .post('/api/v1/diseases')
        .set('token', token)
        .send({
          treatment: 'Avoid mosquitos',
          images:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCEgmwK5csc-zS9mjR8qRREhaW_Z1jRaLP8_dkr6K5qjuCj31byA',
          signs_symptoms: 'anemia',
          preventative_measures: 'avoid mosquito infected areas',
          testing_procedures: 'blood smear',
          transmission: 'Anophiles Mosquito',
          summary: 'Malaria is bad'
        })
        .end((error, response) => {
          response.should.be.json;
          response.should.status(422);
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('Invalid disease supplied, valid disease must have name, treatment, signs/symptoms, preventative measures, testing procedures, transmission, image, and a summary');
          done();
        });
    });
  });

  describe('PUT api/v1/diseases/:id', () => {
    it('should update a disease', (done) => {
      chai
        .request(app)
        .put('/api/v1/diseases/1')
        .set('token', token)
        .send({ treatment: 'eat lots of ice cream' })
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('disease updated');
          done();
        });
    });

    it('should return an error if invalid id provided when updating diseases', (done) => {
      chai
        .request(app)
        .put('/api/v1/diseases/hello')
        .set('token', token)
        .send({ name: 'Aldo' })
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(500);
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.should.have.property('error');
          response.body.message.should.equal('Failed to update disease data');
          done();
        });
    });
  });

describe('DELETE /api/v1/diseases/:id', () => {
    it('should delete a disease', (done) => {
      chai
        .request(app)
        .delete('/api/v1/diseases/1')
        .set('token', token)
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(500);
          response.body.should.have.property('error');
          response.body.error.should.equal('Please delete associated case count data first');
          done();
        });
    });

    it('should return an error if unable to delete disease', (done) => {
      chai
        .request(app)
        .delete('/api/v1/diseases/25')
        .set('token', token)
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(404);
          response.body.should.have.property('message');
          response.body.message.should.equal('Unable to find disease id');
          done();
        });
    });

    it('should return an error if invalid endpoint', (done) => {
      chai
        .request(app)
        .delete('/api/v1/diseases/nothing')
        .set('token', token)
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(500);
          response.body.should.have.property('error');
          done();
        });
    });
 });
});
