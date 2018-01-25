exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { id: 1, firstname: 'Admin', lastname: 'Istrator', role: 'admin' },
    { id: 2, firstname: 'Lorem', lastname: 'Ipsum' },
    { id: 3, firstname: 'John', lastname: 'Doe' },
    { id: 4, firstname: 'Jane', lastname: 'Grey' }
  ])
  .then(() => {
    return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
  })
}