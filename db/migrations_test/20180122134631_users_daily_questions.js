exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_daily_questions', (table) => {
    table.increments()
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('daily_question_id').notNullable()
    table.foreign('daily_question_id').references('daily_questions.id')
    table.boolean('got_correct').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_daily_questions')
}
