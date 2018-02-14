exports.up = function(knex, Promise) {
  return knex.schema.createTable('daily_items', (table) => {
    table.increments()
    table.string('date').notNullable().defaultTo(new Date().toJSON())
    table.integer('question_id').notNullable()
    table.foreign('question_id').references('questions.id')
    table.integer('tip_id').notNullable()
    table.foreign('tip_id').references('tips.id')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('daily_items')
}
