exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', (table) => {
    table.increments()
    table.string('question').notNullable().defaultTo('')
    table.string('choices').notNullable().defaultTo('')
    table.string('answer').notNullable().defaultTo('')
    table.string('explanation').defaultTo(null)
    table.integer('infopedia_id').defaultTo(null)
    table.string('image_url').defaultTo(null)
    table.boolean('used').notNullable().defaultTo(false)
    table.boolean('edited').notNullable().defaultTo(false)
    table.boolean('deleted').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions')
}
