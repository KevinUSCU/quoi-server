const express = require('express')
const router = express.Router()
const { AuthController, UsersController } = require('../controllers')

// CREATE USER should be done though auth/signup route

router.get('/fromtoken', UsersController.showOneFromToken)
router.get('/', AuthController.isAdmin, UsersController.index)
router.get('/:userId', AuthController.matchesThisUserOrAdmin, UsersController.show)

// User role attribute can only be updated through promote
router.put('/:userId', AuthController.matchesThisUserOrAdmin, UsersController.update)
router.put('/promote/:userId', AuthController.isAdmin, UsersController.changeRole)

router.delete('/:userId', AuthController.isAdmin, UsersController.destroy)

module.exports = router
