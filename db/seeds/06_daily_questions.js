exports.seed = function(knex, Promise) {
  return knex('daily_questions').insert([
    { id: 1, date: '2018-01-27T05:15:50.118Z', question_id: 2 },
    { id: 2, date: '2018-01-28T05:15:50.118Z', question_id: 1 }
  ])
  .then(() => {
    return knex.raw(`SELECT setval('daily_questions_id_seq', (SELECT MAX(id) FROM daily_questions));`)
  })
}