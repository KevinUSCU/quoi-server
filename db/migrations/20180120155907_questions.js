exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', (table) => {
    table.increments()
    table.enu('type', [ 'multiple_choice' ]).defaultTo('multiple_choice')
    table.string('question').notNullable().defaultTo('')
    table.string('choices').defaultTo(null)
    table.string('answer').notNullable().defaultTo('')
    table.string('explanation').defaultTo(null)
    table.integer('infopedia_id').notNullable()
    table.foreign('infopedia_id').references('cyclopedia.id')
    table.string('image_url').defaultTo(null)
    table.boolean('edited').notNullable().defaultTo(false)
    table.boolean('deleted').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions')
}
