exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('diseases', table => {
      table.increments('id').primary();
      table.string('name');
      table.text('treatment');
      table.text('signs_symptoms');
      table.text('preventative_measures');
      table.text('testing_procedures');
      table.text('images');
      table.text('transmission');
      table.text('summary');
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
      table.string('case_count');
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
