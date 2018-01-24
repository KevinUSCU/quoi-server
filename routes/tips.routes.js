const express = require('express')
const router = express.Router()
const { TipsController } = require(`../controllers`)

router.get('/tipoftheday', TipsController.tipOfTheDay)
router.get('/', TipsController.index)
router.get('/:id', TipsController.show)

router.post('/', TipsController.create) //needs auth

router.put('/:id', TipsController.update) //needs auth

router.delete('/:id', TipsController.destroy) //needs auth

module.exports = router
