const Model = require('./default.model')('users_questions') // users_questions is the table name
const db = require('../db/knex')

class UserQuestionModel extends Model {

  static findMatch(userId, questionId) {
    return db('users_questions')
    .where({ user_id: userId, question_id: questionId})
    .first() // We will gurantee we've never created more than one 
  }

  static allQuestionsForUser(userId) {
    return db('users_questions')
    .select('question_id as id', 'answer_history', 'question', 'choices', 'answer', 'explanation', 'infopedia_id', 'image_url', 'deleted')
    .where({ user_id: userId })
    .join('questions', 'question_id', 'questions.id')
  }

}

module.exports = UserQuestionModel
