exports.up = function(knex, Promise) {
  return knex.schema.createTable('daily_questions', (table) => {
    table.increments()
    table.string('date').notNullable().defaultTo(new Date().toJSON())
    table.integer('question_id').notNullable()
    table.foreign('question_id').references('questions.id')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('daily_questions')
}
