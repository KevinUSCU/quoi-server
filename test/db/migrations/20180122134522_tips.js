exports.up = function(knex, Promise) {
  return knex.schema.createTable('tips', (table) => {
    table.increments()
    table.string('tip').notNullable().defaultTo('')
    table.boolean('used').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tips')
}
