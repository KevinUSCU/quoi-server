const Controller = require('./default.controller')('Question') //Question is the model name
const { DailyQuestionModel, QuestionModel, UserQuestionModel, UserDailyQuestionModel, UserModel } = require('../models')

class QuestionsController extends Controller {

  static questionsForUser (req, res, next) {
    const userId = req.params.userId
    if (!Number(userId)) throw new Error(`noSuchRoute`) // Catch malformed routes

    UserQuestionModel.allQuestionsForUser(req.params.userId)
    .then(response => res.status(200).json({ ['Questions']: response }))
    .catch(next)
  }

  static questionOfTheDay (req, res, next) {
    res.status(200).json({ Question: TASKRUNNER.questionOfTheDay })
  }

  static dailyQuestionsIndex (req, res, next) {
    QuestionModel.allDailyQuestions()
    .then(response => res.status(200).json({ ['Questions']: response }))
    .catch(next)
  }

  static dailyQuestionsForUser (req, res, next) {
    const userId = req.params.userId
    if (!Number(userId)) throw new Error(`noSuchRoute`) // Catch malformed routes

    QuestionModel.allDailyQuestionsForUser(userId)
    .then(response => res.status(200).json({ ['Questions']: response }))
    .catch(next)
  }

  static reanswerQuestionForUser (req, res, next) {
    const questionId = req.params.id
    const userId = req.params.userId
    if (!Number(questionId) || !Number(userId)) throw new Error(`noSuchRoute`) // Catch malformed routes

    const { answer } = req.body
    if (typeof answer !== 'number') throw new Error('missingAnswer')

    // Verify user exists (first promise) and if the user has answered this question before (second promise)
    const promises = [ UserModel.find(userId), UserQuestionModel.findMatch(userId, questionId) ]
    Promise.all(promises)
    .then(results => {
      if (!results[0]) throw new Error('noSuchUser')
      if (!results[1]) throw new Error('noSuchQuestionForUser')

      // Determine correctness of provided answer
      const gotCorrect = answer == results[1].answer

      // Update users_questions record
      let answerHistory = JSON.parse(results[1].answer_history)
      answerHistory.push(gotCorrect)
      return UserQuestionModel.update(results[1].id, { answer_history: JSON.stringify(answerHistory) })
    })
    .then(() => res.status(201).json({ Answer: 'User answer recorded' }))
    .catch(next)
  }

  static recordDailyQuestionAnswerForUser (req, res, next) {
    const userId = req.params.userId
    const { answer, considersRelevant } = req.body

    const date = TASKRUNNER.date
    const question = TASKRUNNER.questionOfTheDay
    
    if (!Number(userId)) throw new Error(`noSuchRoute`) // Catch malformed routes
    if (typeof answer !== 'number') throw new Error('missingAnswer')
    if (typeof considersRelevant !== 'boolean') throw new Error('missingRelevant')
    
    // Verify user exists (first promise), if the user has answered this question before (second promise), and get the id of the current daily question (third promise)
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
        promises.push(UserQuestionModel.create({ user_id: userId, question_id: question.id, answer_history: JSON.stringify([gotCorrect]), considers_relevant: considersRelevant }))
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
