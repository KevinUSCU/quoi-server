const Controller = require('./default.controller')('Question') //Question is the model name
const { QuestionModel } = require('../models')

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
      optional: [ 'question', 'choices', 'answer', 'explanation', 'infopedia_id', 'image_url', 'edited' ]
    }
    req.body.edited = true //mark as edited
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
