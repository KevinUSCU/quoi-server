require('dotenv').load()
const model = require('../models/token.model')

describe('Token Model', () => {

  test('It should be able to sign a token and then decode that token to get the same value it started with', () => {
    return expect((async () => {
      const token = await model.sign(1)
      const header = { Authorization: `Bearer ${token}` }
      const result = await model.verifyAndExtractHeaderToken(header)
      return result.sub.id
    })())
    .resolves.toBe(1)
  })

})