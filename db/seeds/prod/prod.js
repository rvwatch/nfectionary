const diseases = require('../../../data/disease-data.json');
const influenza = require('../../../data/influenza-data.json');
const salmonella = require('../../../data/salmonellosis-data.json');
const eColi = require('../../../data/e-coli-data.json');
const legionella = require('../../../data/legionellosis-data.json');
const states = require('../../../data/state-data.json');
const campylobacter = require('../../../data/campylobacter-data.json');
const giardia = require('../../../data/giardia-data.json');
const mumps = require('../../../data/mumps-data.json');
const pertussis = require('../../../data/pertussis-data.json');


exports.seed = (knex, Promise) => {
  return knex('state_diseases')
    .del()
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
    .then(() => {
      const diseasePromises = [];

      influenza.forEach(flu => {
        let fluId = flu.disease_id;

        diseasePromises.push(createIllness(knex, flu, fluId));
      });
      return Promise.all(diseasePromises);
    })
    .then(() => {
      const diseasePromises = [];
      salmonella.forEach(bacteria => {
        let bacteriaId = bacteria.disease_id;

        diseasePromises.push(createIllness(knex, bacteria, bacteriaId));
      });
      return Promise.all(diseasePromises);
    })
    .then(() => {
      const diseasePromises = [];
      eColi.forEach(bacteria => {
        let bacteriaId = bacteria.disease_id;

        diseasePromises.push(createIllness(knex, bacteria, bacteriaId));
      });
      return Promise.all(diseasePromises);
    })
    .then(() => {
      const diseasePromises = [];
      legionella.forEach(bacteria => {
        let bacteriaId = bacteria.disease_id;

        diseasePromises.push(createIllness(knex, bacteria, bacteriaId));
      });
      return Promise.all(diseasePromises);
    })
    .then(() => {
      const diseasePromises = [];
      giardia.forEach(parasite => {
        let parasiteId = parasite.disease_id;

        diseasePromises.push(createIllness(knex, parasite, parasiteId));
      });
      return Promise.all(diseasePromises);
    })
    .then(() => {
      const diseasePromises = [];
      campylobacter.forEach(bacteria => {
        let bacteriaId = bacteria.disease_id;

        diseasePromises.push(createIllness(knex, bacteria, bacteriaId));
      });
      return Promise.all(diseasePromises);
    })
    .then(() => {
      const diseasePromises = [];
      mumps.forEach(virus => {
        let virusId = virus.disease_id;

        diseasePromises.push(createIllness(knex, virus, virusId));
      });
      return Promise.all(diseasePromises);
    })
    .then(() => {
      const diseasePromises = [];
      pertussis.forEach(bacteria => {
        let bacteriaId = bacteria.disease_id;

        diseasePromises.push(createIllness(knex, bacteria, bacteriaId));

      }); 
      return Promise.all(diseasePromises);
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

const createIllness = (knex, disease, id) => {
  const { disease_id, state_id, case_count } = disease;

  return knex('diseases').where('id', id).first()
    .then((record) => {
        return knex('state_diseases').insert({
          diseases_id: record.id,
          states_id: state_id,
          case_count
        });
    });
}