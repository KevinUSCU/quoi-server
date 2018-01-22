exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { id: 1, firstname: 'Admin', lastname: 'Istrator', role_id: 1 },
    { id: 2, firstname: 'Lorem', lastname: 'Ipsum', role_id: 2 },
    { id: 3, firstname: 'John', lastname: 'Doe', role_id: 2 },
    { id: 4, firstname: 'Jane', lastname: 'Grey', role_id: 2 }
  ])
  .then(() => {
    return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
  })
}