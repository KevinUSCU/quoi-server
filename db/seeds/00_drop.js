exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let promises = [
    knex('users_daily_questions').del(),
    knex('users_questions').del(),
    knex('daily_questions').del(),
    knex('infopedia').del(),
    knex('questions').del(),
    knex('auth').del(),
    knex('users').del(),
    knex('tips').del()
  ]
  return Promise.all(promises) 
}