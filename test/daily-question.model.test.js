const model = require('../models/daily-question.model')
const db = require('../db/knex')

describe('Daily Question Model', () => {

  beforeAll(() => {
    return db.migrate.latest()
    .catch(err => {
      console.error(err)
    })
  })

  // beforeEach(() => {
  //   return db.seed.run({ directory: './db/seeds_test' })
  //   .catch(err => {
  //     console.error(err)
  //   })
  // })

  afterAll(() => {
    return db.destroy()
    .catch(err => {
      console.error(err)
    })
  })

  describe('Find (by date)', () => {
    test('It should return the daily question for an existing date', () => {
      const dataEntry = { date: '2000-01-01T05:15:50.118Z', question_id: 1 }
      return model.create(dataEntry)
      .then(() => {
        return expect(model.findByDate('2000-01-01T05:15:50.118Z')).resolves.toMatchObject(dataEntry)
      })
    })
    test('It should return undefined when there is no daily question for the given date', () => {
      return expect(model.findByDate('notPresent')).resolves.toBe(undefined)
    })
  })

})
