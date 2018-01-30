const express = require('express')
const router = express.Router()
const { InfopediaController } = require(`../controllers`)

router.get('/groupedbycategory', InfopediaController.groupedByCategory)
router.get('/', InfopediaController.index)
router.get('/:id', InfopediaController.show)

router.post('/', InfopediaController.create) //needs auth

router.put('/:id', InfopediaController.update) //needs auth

router.delete('/:id', InfopediaController.destroy) //needs auth

module.exports = router
