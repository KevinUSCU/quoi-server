exports.seed = function(knex, Promise) {
  return knex('users_questions').insert([
    { id: 1, user_id: 1, question_id: 2, answer_history: '2,1,3', considers_relevant: false },
    { id: 2, user_id: 2, question_id: 2, answer_history: '3', considers_relevant: true },
    { id: 3, user_id: 1, question_id: 3, answer_history: '4', considers_relevant: true }
  ])
  .then(() => {
    return knex.raw(`SELECT setval('users_questions_id_seq', (SELECT MAX(id) FROM users_questions));`)
  })
}