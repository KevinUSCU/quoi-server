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

  // static update (req, res, next) {
  //   // Role, email and password cannot be updated in this way
  //   const id = Number(req.params.id)
  //   const { email, first_name, last_name, children, pets } = req.body
  //   // Note we are stripping out any non-changeable fields
  //   const updatedUser = { email, first_name, last_name, children, pets }
  //   // Verify user owns profile being updated by checking route against header token
  //   TokenModel.verifyAndExtractHeaderToken(req.headers)
  //   .catch(err => { throw new Error('invalidToken') })
  //   .then(token => {
  //     if (token.sub.id !== id) throw new Error('unauthorizedUser')
  //     // If email was changed, verify no duplicates
  //     if (email) {
  //       UserModel.getUserIdByEmail(email)
  //       .then(existingUser => {
  //         if (existingUser) throw new Error('duplicateUser')
  //       })
  //       // Update user profile with supplied data
  //       .then(() => UserModel.update(id, updatedUser))
  //       .then(result => res.status(200).json({ User: result }))
  //       .catch(next)
  //     } else {
  //       // Update user profile with supplied data
  //       UserModel.update(id, updatedUser)
  //       .then(result => res.status(200).json({ User: result }))
  //       .catch(next)
  //     }
  //   })
  //   .catch(next)
  // }

  // static changeRole (req, res, next) {
  //   // An 'admin' token is required to change the role of another user
  //   const id = req.params.id
  //   const role = req.body.role
  //   if (!role) throw new Error('missingRole')
  //   if (role !== 'admin' && role !== 'user') throw new Error('incorrectRoleType')
  //   // Update role of user in db
  //   UserModel.update(id, { role })
  //   .then(result => {
  //     if (!result) throw new Error('noSuchUser')
  //     return res.status(200).json({ User: result })
  //   })
  //   .catch(next)
  // }

  // static destroy (req, res, next) {
  //   // *** Deleting a user requires role of 'admin' ***
  //   // Admin accounts cannot be deleted
  //   const id = req.params.id
  //   UserModel.find(id)
  //   .then(result => {
  //     if (result.role === 'admin') throw new Error('cannotDeleteAdmin')
  //   })
  //   // Delete user
  //   .then(() => UserModel.destroy(id))
  //   .then(result => res.status(204).json())
  //   .catch(next)
  // }

}

module.exports = UsersController
