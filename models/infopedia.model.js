const Model = require('./default.model')('infopedia') //infopedia is the table name
const db = require('../db/knex')

class InfopediaModel extends Model {

  static allOrderedByCategory() {
    return db('infopedia')
    .orderByRaw('category, title')
  }

}

module.exports = InfopediaModel
