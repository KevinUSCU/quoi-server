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

// Only explanation, infopedia_id, and image_url can be edited for a question.
router.put('/:id', QuestionsController.update) //needs auth

router.delete('/:id', QuestionsController.destroy) //needs auth

module.exports = router
