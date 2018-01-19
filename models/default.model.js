const db = require('../db/knex')

module.exports = tableName => {
  class Model {
    static all (userId) {
      if (userId) {
        return db(tableName)
        .where({ user_id: userId })
      }
      return db(tableName)
    }

    static find (id, userId) {
      if (userId) {
        return db(tableName)
        .where({ id, user_id: userId })
        .first()
      }
      return db(tableName)
      .where({ id })
      .first()
    }

    static create (body, userId) {
      if (userId) body.user_id = userId
      return db(tableName)
      .insert(body)
      .returning('*')
      .then(([ result ]) => result)
    }

    static update (id, body, userId) {
      if (userId) {
        body.user_id = userId
        return db(tableName)
        .where({ id, user_id: userId })
        .update(body)
        .returning('*')
        .then(([ result ]) => result)  
      }
      return db(tableName)
      .where({ id })
      .update(body)
      .returning('*')
      .then(([ result ]) => result)
    }

    static destroy (id, userId) {
      if (userId) {
        return db(tableName)
        .where({ id, user_id: userId })
        .delete()  
      }
      return db(tableName)
      .where({ id })
      .delete()
    }
  }

  return Model
}
