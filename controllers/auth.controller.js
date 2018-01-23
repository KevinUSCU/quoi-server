const Controller = require('./default.controller')('Auth') //Auth is the model name
const { AuthModel, UserModel, TokenModel } = require('../models')
const bcrypt = require('bcryptjs')

class AuthController extends Controller {

  static login (req, res, next) {
    //Login requires email and password (no token) and will return a token
    const { email, password } = req.body
    if (!email) throw new Error('missingEmail')
    if (!password) throw new Error('missingPassword')
    //Retrieve matched user from database
    AuthModel.find(email) 
    .then(user => {
      if (!user) throw new Error('noSuchUser')
      // Check for supplied password match against stored hash
      if (!bcrypt.compareSync(password, user.hashed_password)) throw new Error('invalidPassword')
      // Sign new token with user id
      return TokenModel.sign(user.user_id)
    })
    // Return token to client
    .then(token => res.status(200).json({ Auth: token }))
    .catch(next)
  }

  static signup (req, res, next) {
    //Signup will create a new user; no token is required, however a token will be returned
    const { email, password, firstname, lastname } = req.body
    if (!firstname) throw new Error('missingFirstname')
    if (!lastname) throw new Error('missingLastname')
    if (!email) throw new Error('missingEmail')
    if (!password) throw new Error('missingPassword')
    // Verify that email is unique
    AuthModel.find(email)
    .then(existingUser => {
      if (existingUser) throw new Error('duplicateUser')
      // If unique, add new user to users database; all new users created with role of 'user'
      const newUser = { firstname, lastname }
      return UserModel.create(newUser)
    })
    .then(newUser => {
      //Add user auth data to database
      const newUserAuth = { user_id: newUser.id, email, hashed_password: bcrypt.hashSync(password) }
      return AuthModel.create(newUserAuth)
    })
    // Sign and return a token for the new user
    .then(result => TokenModel.sign(result.user_id))
    // Return token to client
    .then(token => res.status(201).json({ Auth: token }))
    .catch(next)
  }

  static update (req, res, next) {
    const { email, password } = req.body
    const hashed_password = password ? bcrypt.hashSync(password) : undefined
    //Validate and decode token
    TokenModel.verifyAndExtractHeaderToken(req.headers)
    .catch(err => { throw new Error('invalidToken') })
    //Update email/password in database based on user id in token
    .then(token => AuthModel.update(token.sub.id, { email, hashed_password }))
    .then(result => res.status(200).json({ Auth: result.user_id }))
    .catch(next)
  }

}

module.exports = AuthController