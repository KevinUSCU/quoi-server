exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('firstname').notNullable().defaultTo('')
    table.string('lastname').notNullable().defaultTo('')
    table.integer('role_id').notNullable()
    table.foreign('role_id').references('user_roles.id')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
