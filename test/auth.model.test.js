const model = require('../models/auth.model')
const db = require('../db/knex')

describe('Auth Model', () => {

  beforeAll(() => {
    return db.migrate.latest()
    .catch(err => {
      throw new Error(err)
    })
  })

  beforeEach(() => {
    return db.seed.run()
    .catch(err => {
      throw new Error(err)
    })
  })

  afterAll(() => {
    return db.destroy()
  })

  describe('View all', () => {
    test('It should throw an error if .all() method is called', () => {
      return expect(() => model.all()).toThrow()
    })
  })


})
