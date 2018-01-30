const Model = require('./default.model')('daily_questions') //daily_questions is the table name
const db = require('../db/knex')

class DailyQuestionModel extends Model {

  static findByDate(date) {
    return db('daily_questions')
    .where({ date })
    .first() // There should only be one entry for each date
  }

}

module.exports = DailyQuestionModel
