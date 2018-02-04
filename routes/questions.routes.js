const express = require('express')
const router = express.Router()
const { AuthController, QuestionsController } = require(`../controllers`)

router.get('/questionoftheday', QuestionsController.questionOfTheDay)

router.get('/dailyquestions', AuthController.isAdmin, QuestionsController.dailyQuestionsIndex)
router.get('/dailyquestions/:userId', AuthController.matchesThisUserOrAdmin, QuestionsController.dailyQuestionsForUser)

router.get('/foruser/:userId', AuthController.matchesThisUserOrAdmin, QuestionsController.questionsForUser)

router.get('/', QuestionsController.index)
router.get('/:id', QuestionsController.show)

router.post('/dailyquestionanswer/:userId', AuthController.matchesThisUser, QuestionsController.recordDailyQuestionAnswerForUser)

router.post('/reanswerquestion/:id/foruser/:userId', AuthController.matchesThisUser, QuestionsController.reanswerQuestionForUser)

router.post('/', AuthController.isAdmin, QuestionsController.create)

// Only explanation, infopedia_id, and image_url can be edited for a question.
router.put('/:id', AuthController.isAdmin, QuestionsController.update)

router.delete('/:id', AuthController.isAdmin, QuestionsController.destroy)

module.exports = router
