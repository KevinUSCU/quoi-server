const Controller = require('./default.controller')('Infopedia') //Infopedia is the model name
const { InfopediaModel } = require('../models')

class InfopediaController extends Controller {

  static create (req, res, next) {
    req.fields = {
      required: ['category', 'title', 'description'],
      optional: []
    }
    return super.create(req, res, next)
  }

  static update (req, res, next) {
    req.fields = {
      required: [],
      optional: ['category', 'title', 'description']
    }
    return super.update(req, res, next)
  }

}

module.exports = InfopediaController
