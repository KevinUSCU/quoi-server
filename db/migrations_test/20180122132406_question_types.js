exports.up = function(knex, Promise) {
  return knex.schema.createTable('question_types', (table) => {
    table.increments()
    table.string('type').unique().notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('question_types')
}
