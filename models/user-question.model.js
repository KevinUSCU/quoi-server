const Model = require('./default.model')('users_questions') // users_questions is the table name
const db = require('../db/knex')

class UserQuestionModel extends Model {

  static findMatch(userId, questionId) {
    return db('users_questions')
    .where({ user_id: userId, question_id: questionId})
    .first() // We will gurantee we've never created more than one 
  }

}

module.exports = UserQuestionModel
