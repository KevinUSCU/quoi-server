exports.seed = function(knex, Promise) {
  return knex('question_types').insert([
    { id: 1, type: 'multiple_choice' }
  ])
  .then(() => {
    return knex.raw(`SELECT setval('question_types_id_seq', (SELECT MAX(id) FROM question_types));`)
  })
}