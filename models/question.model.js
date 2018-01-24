const Model = require('./default.model')('questions') //questions is the table name
const db = require('../db/knex')

class QuestionModel extends Model {

  static removeInfoLinks(infopediaId) {
    return db('questions')
    .where({ infopedia_id: infopediaId })
    .update({ infopedia_id: null })
  }

}

module.exports = QuestionModel
