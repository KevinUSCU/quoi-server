const Model = require('./default.model')('questions') //question is the table name
const db = require('../db/knex')

class QuestionModel extends Model {}

module.exports = QuestionModel
