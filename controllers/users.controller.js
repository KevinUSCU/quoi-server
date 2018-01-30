const Controller = require('./default.controller')('User') //User is the model name
const { TokenModel, UserModel } = require('../models')
const bcrypt = require('bcryptjs')

class UsersController extends Controller {

  static showOneFromToken (req, res, next) {
    // Validate and decode token
    TokenModel.verifyAndExtractHeaderToken(req.headers)
    .catch(err => { throw new Error('invalidToken') })
    // Check for and retrieve user from database
    .then(token => UserModel.find(token.sub.id))
    .then(user => {
      if (!user) throw new Error('noSuchUser')
      return res.status(200).json({ User: user })
    })
    .catch(next)
  }

  static update (req, res, next) {
    // Update role of user in db
    req.fields = {
      required: [],
      optional: ['firstname', 'lastname']
    }
    super.update(req, res, next)
  }

  static changeRole (req, res, next) {
    if (!(req.body.role === 'admin' || req.body.role === 'user')) throw new Error('incorrectRoleType')
    // Update role of user in db
    req.fields = {
      required: ['role'],
      optional: []
    }
    super.update(req, res, next)
  }

  static destroy (req, res, next) {
    if (!Number(req.params.id)) throw new Error(`noSuchRoute`) // Catch malformed routes
    // Admin accounts cannot be deleted
    const id = req.params.id
    UserModel.find(id)
    .then(result => {
      if (!result) throw new Error('noSuchUser')
      if (result.role === 'admin') throw new Error('cannotDeleteAdmin')
      // Delete user
      super.destroy(req, res, next)
    })
    .catch(next)
  }

}

module.exports = UsersController
