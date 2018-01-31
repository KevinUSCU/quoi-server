const Model = require('./default.model')('users_daily_questions') // users_daily_questions is the table name
const db = require('../db/knex')

class UserDailyQuestionModel extends Model {

  static getAllDailyQuestionsForUser(userId) {
    return db('users_daily_questions')
    .select('date', 'question_id', 'got_correct')
    .where({ user_id: userId })
    .join('daily_questions', 'daily_question_id', 'daily_questions.id')
  }

}

module.exports = UserDailyQuestionModel
