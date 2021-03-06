// Set knex environment
const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/quoi_dev',
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/quoi_test',
    migrations: {
      directory: path.join(__dirname, 'test/db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'test/db', 'seeds')
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    }
  }
}