const express = require('express')
const router = express.Router()
const { AuthController } = require(`../controllers`)

router.post('/signup', AuthController.signup) //new users should only be created through signup

router.post('/login', AuthController.login)

router.put('/update', AuthController.update) //updates only auth info (email, password) and by token sub.id

module.exports = router
