const express = require('express')
const router = express.Router()
const { QuestionsController } = require(`../controllers`)

router.get('/questionoftheday', QuestionsController.questionOfTheDay)
router.get('/dailyquestions', QuestionsController.dailyQuestionsIndex)
router.get('/dailyquestions/:userId', QuestionsController.dailyQuestionsForUser)
router.get('/', QuestionsController.index)
router.get('/:id', QuestionsController.show)

router.post('/dailyquestionanswer/:userId', QuestionsController.recordDailyQuestionAnswerForUser)
router.post('/', QuestionsController.create) //needs auth

// Editing questions is not allowed. Client can 'edit' by creating a new question and pre-filling the old data for the user.

router.delete('/:id', QuestionsController.destroy) //needs auth

module.exports = router
