
exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
    table.increments();
    table.integer('vin').unique().notNullable();
    table.string('make').notNullable();
    table.string('model').notNullable();
    table.integer('mileage').notNullable();
    table.string('transmission');
    table.string('title');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
