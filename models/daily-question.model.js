const Model = require('./default.model')('daily_questions') //daily_questions is the table name
const db = require('../db/knex')

class DailyQuestionModel extends Model {}

module.exports = DailyQuestionModel
