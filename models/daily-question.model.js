const Model = require('./default.model')('daily_questions') //daily_questions is the table name
const db = require('../db/knex')

class DailyQuestionModel extends Model {

  static findByDate(date) {
    return db('daily_questions')
    .where({ date })
    .first() // There should only be one entry for each date
  }

  static getQuestionWithNewestDate() {
    return db('daily_questions')
    .select('question_id as id', 'date', 'question', 'choices', 'answer', 'explanation', 'infopedia_id', 'image_url', 'used', 'deleted')
    .where({ date: db('daily_questions').max('date') })
    .join('questions', 'question_id', 'questions.id')
    .first()
  }

}

module.exports = DailyQuestionModel
