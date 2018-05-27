const diseases = require('../../../data/disease-data.json');
const influenza = require('../../../data/influenza-data.json');
const salmonella = require('../../../data/salmonellosis-data.json');
const eColi = require('../../../data/e-coli-data.json');
const legionella = require('../../../data/legionellosis-data.json');
const states = require('../../../data/state-data.json')

exports.seed = (knex, Promise) => {
  return knex('state_diseases').del()
    .then(() => {
      knex('diseases').del();
    })
    .then(() => {
      knex('states').del();
    })
    .then(() => {
      const diseasePromises = [];

      diseases.forEach(disease => {
        diseasePromises.push(createDiseases(knex, disease));
      });
      return Promise.all(diseasePromises);
    })
    .then(() => {
      const statePromises = [];

      states.forEach(state => {
        statePromises.push(createStates(knex, state));
      });
      return Promise.all(statePromises);
    })
    .catch(error => {
      console.log(error);
    });
};

const createDiseases = (knex, disease) => {
  const { name, treatment, signs_symptoms, preventative_measures, testing_procedures, images, transmission, summary } = disease;

  return knex('diseases').insert({
    name,
    treatment,
    signs_symptoms,
    preventative_measures,
    testing_procedures,
    images,
    transmission,
    summary
  });
}

const createStates = (knex, state) => {
  return knex('states').insert({
    name: state.name
  });
}