const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.set('port', port);

app.locals.title = 'nfectionary';

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
        return res.status(404).json('Cannot find disease or state id');
      }
    })
    .catch(err => {
      return res.status(500).json({err});
    });
});

app.get('/api/v1/specific-disease/:id', (req, res) => {
  database('state_diseases').where('state_diseases.diseases_id', req.params.id).select()
    .then(disease => {
      if (disease.length) {
        return res.status(200).json(disease);
      } else {
        return res.status(404).json('Cannot find disease id');
      }
    })
    .catch(err => {
      return res.status(500).json({err});
    });
});


app.get('/api/v1/state-diseases/:id', (req, res) => {
  database('state_diseases').where('state_diseases.states_id', req.params.id).select()
    .then(state => {
      if (state.length) {
        return res.status(200).json(state);
      } else {
        return res.status(404).json('Cannot find state id');
      }
    })
    .catch(err => {
      return res.status(500).json({err});
    });
});

app.get('/api/v1/diseases', (req, res) => {
  database('diseases').select()
    .then(disease => {
        return res.status(200).json(disease);
    })
    .catch(err => {
      return res.status(500).json({err});
    });
});

app.get('/api/v1/diseases/:id', (req, res) => {
  database('diseases').where('id', req.params.id).select()
    .then(disease => {
      if (disease.length) {
        return res.status(200).json(disease[0]);
      } else {
        return res.status(404).json('Cannot find disease id');
      }
    })
    .catch(err => {
      return res.status(500).json({err});
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`); // eslint-disable-line
});

module.exports = { app, database };
