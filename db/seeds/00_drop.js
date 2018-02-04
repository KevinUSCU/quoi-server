exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_daily_questions').del()
    .then(() => knex('users_questions').del())
    .then(() => knex('daily_questions').del())
    .then(() => knex('infopedia').del())
    .then(() => knex('questions').del())
    .then(() => knex('auth').del())
    .then(() => knex('users').del())
    .then(() => knex('tips').del())
}
// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('users').del()
//     .then(() => knex('users_questions').del())
//     .then(() => knex('users_daily_questions').del())
//     .then(() => knex('daily_questions').del())
//     .then(() => knex('questions').del())
//     .then(() => knex('auth').del())
//     .then(() => knex('infopedia').del())
//     .then(() => knex('tips').del())
// }
