const model = require('../models/auth.model')
const db = require('../db/knex')

describe('Auth Model', () => {

  beforeAll(() => {
    return db.migrate.latest()
    .catch(err => {
      console.error(err)
    })
  }, 10000)

  beforeEach(() => {
    return db.seed.run()
    .catch(err => {
      console.error(err)
    })
  }, 10000)

  afterAll(() => {
    return db.destroy()
    .catch(err => {
      console.error(err)
    })
  }, 10000)

  describe('View all', () => {
    test('It should throw an error if .all() method is called', () => {
      return expect(() => model.all()).toThrow()
    })
  })

  describe('Find', () => {
    test('It should return a user when a valid email is provided', () => {
      const user = { user_id: 1, email: 'admin@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' }
      return expect(model.findByEmail('admin@email.com')).resolves.toMatchObject(user)
    })
    test('It should return undefined when an invalid email is provided', () => {
      return expect(model.findByEmail('notPresent')).resolves.toBe(undefined)
    })
  })

  describe('Update', () => {
    const email = 'newuser@email.com'
    const hashedPassword = 'changedhash'
    const user1 = { user_id: 1, email: 'newuser@email.com', hashed_password: 'changedhash' }
    const user2 = { user_id: 2, email: 'newuser@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' }
    const user3 = { user_id: 3, email: 'john@email.com', hashed_password: 'changedhash' }

    test('It should return an updated user when both new email and hashed_passwords are provided', () => {
      return expect(model.update(1, { email, hashed_password: hashedPassword })).resolves.toMatchObject(user1)
    })
    test('It should return an updated user when only a new email is provided', () => {
      return expect(model.update(2, { email })).resolves.toMatchObject(user2)
    })
    test('It should return an updated user when only a new password is provided', () => {
      return expect(model.update(3, { hashed_password: hashedPassword })).resolves.toMatchObject(user3)
    })
    test('It should return undefined when an invalid userId is provided', () => {
      return expect(model.update(7, { email, hashed_password: hashedPassword })).resolves.toBe(undefined)
    })
  })

  describe('Destroy', () => {
    test('It should throw an error if .destroy() method is called', () => {
      return expect(() => model.destroy(1)).toThrow()
    })
  })

})
