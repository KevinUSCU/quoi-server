const Model = require('./default.model')('users_daily_questions') // users_daily_questions is the table name
const db = require('../db/knex')

class UserDailyQuestionModel extends Model {}

module.exports = UserDailyQuestionModel
