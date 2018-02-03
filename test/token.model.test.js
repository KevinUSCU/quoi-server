process.env.SECRET_KEY = 'secret'

const model = require('../models/token.model')

describe('Token Model', () => {

  test('It should be able to sign a token and then decode that token to get the same value it started with', () => {
    return model.sign(1)
    .then(token => {
      const header = { authorization: `Bearer ${token}` }
      return model.verifyAndExtractHeaderToken(header)
    })
    .then(result => expect(result.sub.id).toBe(1))
  })

})