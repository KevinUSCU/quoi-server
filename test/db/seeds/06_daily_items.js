exports.seed = function(knex, Promise) {
  return knex('daily_items').insert([
    { id: 1, date: '2018-01-27T05:15:50.118Z', question_id: 2, tip_id: 1 },
    { id: 2, date: '2018-01-28T05:15:50.118Z', question_id: 1, tip_id: 2 },
    { id: 3, date: '2018-01-29T05:15:50.118Z', question_id: 7, tip_id: 3 }
  ])
  .then(() => {
    return knex.raw(`SELECT setval('daily_items_id_seq', (SELECT MAX(id) FROM daily_items));`)
  })
}