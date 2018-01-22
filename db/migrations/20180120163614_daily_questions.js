exports.up = function(knex, Promise) {
  return knex.schema.createTable('daily_questions', (table) => {
    table.increments()
    table.date('date').notNullable().defaultTo(new Date().toISOString().substr(0,10))
    table.integer('question_id').notNullable()
    table.foreign('question_id').references('questions.id')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('daily_questions')
}
