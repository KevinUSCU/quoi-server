const Controller = require('./default.controller')('Question') //Question is the model name
const { QuestionModel } = require('../models')

class QuestionsController extends Controller {

  static create (req, res, next) {
    req.fields = {
      required: ['type_id', 'question', 'answer' ],
      optional: ['choices', 'explanation', 'infopedia_id', 'image_url' ]
    }
    super.create(req, res, next)
  }

  static update (req, res, next) {
    req.fields = {
      required: [],
      optional: [ 'type_id', 'question', 'choices', 'answer', 'explanation', 'infopedia_id', 'image_url', 'edited' ]
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
