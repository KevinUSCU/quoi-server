exports.seed = function(knex, Promise) {
  return knex('user_roles').insert([
    { id: 1, role: 'admin' },
    { id: 2, role: 'user' }
  ])
  .then(() => {
    return knex.raw(`SELECT setval('user_roles_id_seq', (SELECT MAX(id) FROM user_roles));`)
  })
}