const Controller = require('./default.controller')('Infopedia') //Infopedia is the model name
const { InfopediaModel, QuestionModel } = require('../models')

class InfopediaController extends Controller {

  static create (req, res, next) {
    req.fields = {
      required: ['category', 'title', 'description'],
      optional: []
    }
    super.create(req, res, next)
  }

  static update (req, res, next) {
    req.fields = {
      required: [],
      optional: ['category', 'title', 'description']
    }
    super.update(req, res, next)
  }

  static destroy (req, res, next) {
    return QuestionModel.removeInfoLinks(req.params.id) //remove links to article in questions table
    .then(() => {
      return super.destroy(req, res, next) //remove from infopedia table
    })
    .catch(next)
  }

}

module.exports = InfopediaController
