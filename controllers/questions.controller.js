const Controller = require('./default.controller')('Question') //Question is the model name
const { DailyQuestionModel, QuestionModel, UserQuestionModel, UserDailyQuestionModel, UserModel } = require('../models')

class QuestionsController extends Controller {

  static questionOfTheDay (req, res, next) {
    res.status(200).json({ Question: TASKRUNNER.questionOfTheDay })
  }

  static dailyQuestionsIndex (req, res, next) {
    QuestionModel.allDailyQuestions()
    .then(response => res.status(200).json({ ['Questions']: response }))
    .catch(next)
  }

  static dailyQuestionsForUser (req, res, next) {
    QuestionModel.allDailyQuestionsForUser(req.params.userId)
    .then(response => res.status(200).json({ ['Questions']: response }))
    .catch(next)
  }

  static recordDailyQuestionAnswerForUser (req, res, next) {
    const userId = req.params.userId
    const { answer, considersRelevant } = req.body
    const date = TASKRUNNER.date
    const question = TASKRUNNER.questionOfTheDay
    if (!Number(userId)) throw new Error(`noSuchRoute`) // Catch malformed routes
    if (!answer) throw new Error('missingAnswer')
    if (typeof considersRelevant !== 'boolean') throw new Error('missingRelevant')
    // Verify user exists and if the user has answered this question before
    const promises = [ UserModel.find(userId), UserQuestionModel.findMatch(userId, question.id), DailyQuestionModel.findByDate(date) ]
    Promise.all(promises)
    .then(results => {
      if (!results[0]) throw new Error('noSuchUser')
      // Determine correctness of provided answer
      const gotCorrect = answer == question.answer
      // First promise will add entry to users_daily_questions
      const promises = [ UserDailyQuestionModel.create({ user_id: userId, daily_question_id: results[2].id, got_correct: gotCorrect }) ]
      // Second promise will either update or create users_questions record
      if (results[1]) { // Update
        let answerHistory = JSON.parse(results[1].answer_history)
        answerHistory.push(gotCorrect)
        promises.push(UserQuestionModel.update(results[1].id, { answer_history: JSON.stringify(answerHistory), considers_relevant: considersRelevant }))
      } else { // Create
        promise.push(UserQuestionModel.create({ user_id: userId, question_id: question.id, answer_history: JSON.stringify([gotCorrect]), considers_relevant: considersRelevant }))
      }
      Promise.all(promises)
    })
    .then(() => res.status(201).json({ Answer: 'User answer recorded' }))
    .catch(next)
  }

  static create (req, res, next) {
    req.fields = {
      required: ['question', 'choices', 'answer' ],
      optional: ['explanation', 'infopedia_id', 'image_url' ]
    }
    super.create(req, res, next)
  }

  static update (req, res, next) {
    req.fields = {
      required: [],
      optional: [ 'explanation', 'infopedia_id', 'image_url' ]
    }
    super.update(req, res, next)
  }

  static destroy (req, res, next) { //questions cannot be removed; they are marked as deleted
    req.fields = {
      required: [],
      optional: [ 'deleted' ]
    }
    req.body.deleted = true
    super.update(req, res, next)
  }

}

module.exports = QuestionsController
