const express = require('express')
const router = express.Router()
const { QuestionsController } = require(`../controllers`)

router.get('/questionoftheday', QuestionsController.questionOfTheDay)
router.get('/dailyquestions', QuestionsController.dailyQuestionsIndex)
router.get('/dailyquestions/:userId', QuestionsController.dailyQuestionsForUser)
router.get('/', QuestionsController.index)
router.get('/:id', QuestionsController.show)

router.post('/', QuestionsController.create) //needs auth

router.put('/:id', QuestionsController.update) //needs auth

router.delete('/:id', QuestionsController.destroy) //needs auth

module.exports = router
