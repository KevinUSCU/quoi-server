const express = require('express')
const router = express.Router()
const { AuthController, UsersController } = require('../controllers')

// CREATE USER should be done though auth/signup route

router.get('/fromtoken', UsersController.showOneFromToken)
router.get('/', UsersController.index)
router.get('/:id', UsersController.show)

// User role attribute can only be updated through promote
router.put('/:id', UsersController.update) //needs auth
router.put('/promote/:id', UsersController.changeRole) // needs to require admin auth

router.delete('/:id', UsersController.destroy) // needs to require admin auth

module.exports = router
