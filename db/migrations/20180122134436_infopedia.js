exports.up = function(knex, Promise) {
  return knex.schema.createTable('infopedia', (table) => {
    table.increments()
    table.string('category').notNullable().defaultTo('general')
    table.string('title').notNullable().defaultTo('')
    table.string('description').notNullable().defaultTo('')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('infopedia')
}
