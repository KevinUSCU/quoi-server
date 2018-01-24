const Controller = require('./default.controller')('Tip') //Tip is the model name
const { TipModel } = require('../models')

class TipsController extends Controller {

  static create (req, res, next) {
    req.fields = {
      required: ['tip'],
      optional: []
    }
    super.create(req, res, next)
  }

  static update (req, res, next) {
    req.fields = {
      required: ['tip'],
      optional: []
    }
    super.update(req, res, next)
  }

  static tipOfTheDay (req, res, next) {
    res.status(200).json({ Tip: TASKRUNNER.tipOfTheDay })
  }

}

module.exports = TipsController
