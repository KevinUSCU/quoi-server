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
      expect(() => model.all()).toThrow()
    })
  })

  describe('Find', () => {
    test('It should return a user when a valid email is provided', () => {
      const user = { user_id: 1, email: 'admin@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' }
      return expect(model.find('admin@email.com')).resolves.toMatchObject(user)
    })
    test('It should return undefined when an invalid email is provided', () => {
      return expect(model.find('notPresent')).resolves.toBe(null)
    })
  })


})
