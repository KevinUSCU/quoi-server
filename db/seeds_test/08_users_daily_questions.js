// exports.seed = function(knex, Promise) {
//   return knex('users_daily_questions').insert([
//     { id: 1, user_id: 1, daily_question_id: 1, got_correct: false },
//     { id: 2, user_id: 2, daily_question_id: 1, got_correct: true }
//   ])
//   .then(() => {
//     return knex.raw(`SELECT setval('users_daily_questions_id_seq', (SELECT MAX(id) FROM users_daily_questions));`)
//   })
// }