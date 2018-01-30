exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_questions', (table) => {
    table.increments()
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('question_id').notNullable()
    table.foreign('question_id').references('questions.id')
    table.string('answer_history').notNullable().defaultTo('')
    table.boolean('considers_relevant').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_questions')
}
