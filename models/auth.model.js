const Model = require('./default.model')('auth') //auth is the table name
const db = require('../db/knex')

class AuthModel extends Model {

  //returning all password hashes seems risky, so we pre-emptively override and disallow this
  static all () {
    throw new Error('Requesting all entries is not allowed per security policy')
  }

  static findByEmail (email) {
    return db('auth')
      .where({ email })
      .first()
  }

  static update (userId, body) {
    return db('auth')
      .where({ user_id: userId })
      .update({ ...body, thisKeyIsSkipped: undefined })
      .returning('*')
      .then(([ result ]) => result)
  }

  //auth table entry will be destroyed automatically when user is deleted
  static destroy (userId) {
    throw new Error('You should not call "destroy" on auth; deleting a user will delete this entry as required')
  }
}

module.exports = AuthModel