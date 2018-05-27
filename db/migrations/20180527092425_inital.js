exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('diseases', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('treatment');
      table.string('signs_symptoms');
      table.string('preventative_measures');
      table.string('testing_procedures');
      table.string('images');
      table.string('transmission');
      table.string('summary');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('states', table => {
      table.increments('id').primary();
      table.string('name');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('state_diseases', table => {
      table.increments('id').primary();
      table.integer('diseases_id').unsigned();
      table.foreign('diseases_id').references('diseases.id');
      table.integer('states_id').unsigned();
      table.foreign('states_id').references('states.id');
      table.integer('case_count');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('state_diseases'),
    knex.schema.dropTable('states'),
    knex.schema.dropTable('diseases')
  ]);
};
