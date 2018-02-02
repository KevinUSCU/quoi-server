const express = require('express')
const router = express.Router()
const { AuthController, TipsController } = require(`../controllers`)

router.get('/tipoftheday', TipsController.tipOfTheDay)
router.get('/', TipsController.index)
router.get('/:id', TipsController.show)

router.post('/', AuthController.isAdmin, TipsController.create)

router.put('/:id', AuthController.isAdmin, TipsController.update)

router.delete('/:id', AuthController.isAdmin, TipsController.destroy)

module.exports = router
