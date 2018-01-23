exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_roles', (table) => {
    table.increments()
    table.string('role').unique().notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_roles')
}
