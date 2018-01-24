const Model = require('./default.model')('tips') //tips is the table name
const db = require('../db/knex')

class TipsModel extends Model {}

module.exports = TipsModel
