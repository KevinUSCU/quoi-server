const express = require('express')
const router = express.Router()
const { AuthController, InfopediaController } = require(`../controllers`)

router.get('/groupedbycategory', InfopediaController.groupedByCategory)
router.get('/orderedbycategory', InfopediaController.orderedByCategory)
router.get('/', InfopediaController.index)
router.get('/:id', InfopediaController.show)

router.post('/', AuthController.isAdmin, InfopediaController.create)

router.put('/:id', AuthController.isAdmin, InfopediaController.update)

router.delete('/:id', AuthController.isAdmin, InfopediaController.destroy)

module.exports = router
