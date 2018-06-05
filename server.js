/* eslint-disable max-len */
const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', port);
app.set('secretKey', process.env.KEY);

app.locals.title = 'nfectionary';

const checkAdmin = (req, res, next) => {
  const { token } = req.headers;
  const key = app.get('secretKey');

  if (!token) {
    res.status(403).json({ message: 'You must be authorized to hit this endpoint'});
  } else {
    try {
      const decoded = jwt.verify(token, key);
      const turingEmail = decoded.email.includes('turing.io');

      turingEmail ? next() : res.status(403).json({ message: 'Not authorized'});
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
  }
};

app.post('/authenticate', (req, res) => {
  const { name, email } = req.body;
  const key = app.get('secretKey');
  const options = {
    expiresIn: '48h'
  };

  if (email && name) {
    const token = jwt.sign({ email, name }, key, options);

    res.status(201).json({ token });
  } else {
    res.status(422).json({ message: 'Invalid request, must supply email and name' });
  }
});


app.get('/api/v1/states', (req, res) => {
  database('states').select()
    .then(state => {
      return res.status(200).json(state);
    })
    .catch(err => {
      return res.status(500).json({err});
    });
});

app.get('/api/v1/states/:state_id/diseases/:disease_id', (req, res) => {
  database('state_diseases').where({
    states_id: req.params.state_id,
    diseases_id:  req.params.disease_id
  }).select()
    .then(state => {
      if (state.length) {
        return res.status(200).json(state);
      } else {
        return res.status(404).json({ message: 'Cannot find disease or state id' });
      }
    })
    .catch(err => {
      return res.status(500).json({ err: err, message: 'Invalid Id' });
    });
});

app.put('/api/v1/states/:state_id/diseases/:disease_id', checkAdmin, (req, res) => {
  database('state_diseases').where({
    states_id: req.params.state_id,
    diseases_id: req.params.disease_id
  }).update(req.body)
    .then(() => {
      res.status(200).json({
        message: 'state case count updated'
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: 'Failed to update case count data'
      });
    });
});

app.get('/api/v1/specific-disease/:id', (req, res) => {
  
  database('state_diseases').where('state_diseases.diseases_id', req.params.id).select()
    .then(disease => {
      if (disease.length) {
        return res.status(200).json(disease);
      } else {
        return res.status(404).json({ message: 'Cannot find disease id' });
      }
    })
    .catch(err => {
      return res.status(500).json({ err: err, message: 'Invalid Id' });
    });
});


app.get('/api/v1/state-diseases/:id', (req, res) => {
  database('state_diseases').where('state_diseases.states_id', req.params.id).select()
    .then(state => {
      if (state.length) {
        return res.status(200).json(state);
      } else {
        return res.status(404).json({ message: 'Cannot find state id' });
      }
    })
    .catch(err => {
      return res.status(500).json({ err: err, message: 'Invalid Id'});
    });
});

app.get('/api/v1/diseases', (req, res) => {
  database('diseases').select()
    .then(disease => {
      return res.status(200).json(disease);
    })
    .catch(err => {
      return res.status(500).json({ err });
    });
});

app.get('/api/v1/diseases/:id', (req, res) => {
  database('diseases').where('id', req.params.id).select()
    .then(disease => {
      if (disease.length) {
        return res.status(200).json(disease[0]);
      } else {
        return res.status(404).json({ message: 'Cannot find disease id'});
      }
    })
    .catch(err => {
      return res.status(500).json({err: err, message: 'Invalid Id'});
    });
});

app.post('/api/v1/diseases', checkAdmin, (req, res) => {
  const disease = req.body;

  if (!disease.name ||
    !disease.treatment ||
    !disease.signs_symptoms ||
    !disease.preventative_measures ||
    !disease.testing_procedures ||
    !disease.images ||
    !disease.transmission ||
    !disease.summary) {
    return res.status(422).json({
      message: 'Invalid disease supplied, valid disease must have name, treatment, signs/symptoms, preventative measures, testing procedures, transmission, image, and a summary'
    });
  }

  database('diseases').insert(disease, 'id')
    .then(id => res.status(201).json({
      id: id[0]
    }))
    .catch(error => res.status(500).json({
      error: error,
      message: 'Failed to POST disease'
    }));
});

app.put('/api/v1/diseases/:id', checkAdmin, (req, res) => {
  database('diseases').where('id', req.params.id).update(req.body)
    .then(() => {
      res.status(200).json({
        message: 'disease updated'
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: 'Failed to update disease data'
      });
    });
});

app.delete('/api/v1/diseases/:id', checkAdmin, (req, res) => {
  const id = req.params.id;

  database('diseases').where('id', id).del()
    .then((disease) => {
      if (disease > 0) {
        res.status(200).json({ message: 'Disease deleted successfully'});
      } else {
        res.status(404).json({ message: 'Unable to find disease id'});
      }
    })
    .catch((error) => {
      if (error.code === '23503') {
        res.status(500).json({ error: 'Please delete associated case count data first'});
      } else {
        res.status(500).json({ error: error });
      }
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`); // eslint-disable-line
});

module.exports = { app, database };
