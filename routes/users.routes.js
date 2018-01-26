const express = require('express')
const router = express.Router()
const { AuthController, UsersController } = require('../controllers')

//CREATE USER should be done though auth/signup route

router.get('/fromtoken', UsersController.showOneFromToken)
router.get('/', UsersController.index)
router.get('/:id', UsersController.show)


// EDIT USER
// Change user profile
// requires a token for the user being changed and body with { email, first_name, last_name, children, pets }
// returns the user object { User: {} }
// router.put('/:id', UsersController.update)

// Change user role
// requires a token for an admin and body with { role }
// returns the changed user object { User: {} }
// router.put('/promote/:id', UsersController.changeRole)


// DELETE USER
// (note, admin accounts cannot be deleted; they must be demoted first)
// requires a token for an admin
// returns no message (only the 204 status code)
// router.delete('/:id', UsersController.destroy)

module.exports = router
