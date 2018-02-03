// //Remove the database at the end of testing

module.exports = () => {
  if (!process.env.TRAVIS) { // Don't run this on Travis CI
    const connection = require('knex')
    const dbName = 'quoi_test'

    let db = connection({
      client: 'pg',
      connection: 'postgres://localhost'
    })

    return db.raw(`DROP DATABASE IF EXISTS ${dbName};`)
    .then(result => db.destroy())
    .catch((err) => {
      throw new Error(err)
    })
  }
}