const Controller = require('./default.controller')('Tip') //Tip is the model name
const { TipModel } = require('../models')

class TipsController extends Controller {

  static create (req, res, next) {
    req.fields = {
      required: ['tip'],
      optional: []
    }
    return super.create(req, res, next)
  }

  static update (req, res, next) {
    req.fields = {
      required: ['tip'],
      optional: []
    }
    return super.update(req, res, next)
  }

}

module.exports = TipsController
