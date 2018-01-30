const Model = require('./default.model')('users_questions') // users_questions is the table name
const db = require('../db/knex')

class UserQuestionModel extends Model {}

module.exports = UserQuestionModel
