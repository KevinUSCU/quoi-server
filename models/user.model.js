const Model = require('./default.model')('users') //users is the table name
const db = require('../db/knex')

class UserModel extends Model {}

module.exports = UserModel
