//Recreate test database before tests

module.exports = () => {
  if (!process.env.TRAVIS) { // Don't run this on Travis CI
    const connection = require('knex')
    const dbName = 'quoi_test'

    let db = connection({
      client: 'pg',
      connection: 'postgres://localhost'
    })

    return db.raw(`DROP DATABASE IF EXISTS ${dbName};`)
    .then(result => db.raw(`CREATE DATABASE ${dbName};`))
    .then(result => db.destroy())
    .catch((err) => {
      console.error(err)
    })
  }
}
