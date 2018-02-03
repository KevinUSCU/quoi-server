const request = require('supertest')
const app = require('../server')
const db = require('../db/knex.js') // Use this to close database at end of test

afterAll(() => {
  return db.destroy()
  .catch(err => {
    console.error(err)
  })
})

describe('Server', () => {

  describe('Router', () => {
    test('It returns 404 for a bad route', (done) => {
      request(app)
      .get('/bad')
      .expect(404, done)
    })
    test('It returns an error message for a bad route', (done) => {
      request(app)
      .get('/bad')
      .expect(res => {
        if (!res.body.message) throw new Error('Error message is not present')
      })
      .end(done)
    })
  })

})
