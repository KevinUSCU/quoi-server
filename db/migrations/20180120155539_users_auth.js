exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_auth', (table) => {
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.string('email').notNullable().defaultTo('')
    table.string('hashed_password').notNullable().defaultTo('')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_auth')
}
