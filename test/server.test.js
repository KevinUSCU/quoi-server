// const request = require('supertest')
// const app = require('../server')


// // let request = null
// let server = null

// beforeAll(() => {
//   console.log('beforeall ran')
//   server = app.listen()
//   request.agent(server)
//   console.log(request)
//   // console.log(supertest)
// })

// afterAll(() => {
//   console.log('afterall ran')
//   server.close()
// })

xdescribe('Server', () => {

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
