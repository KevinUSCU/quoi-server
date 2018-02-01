const moment = require('moment')
const { StatModel } = require('../models')

class StatsController {

  static dashboardStatusForUser (req, res, next) {
    if (!Number(req.params.userId)) throw new Error(`noSuchRoute`) // Catch malformed routes
    StatModel.getDashboardStatusForUser(req.params.userId)
    .then(response => res.status(200).json({ Stats: response }))
    .catch(next)
  }

  static dailyQuestionSuccessRateForUser (req, res, next) {
    if (!Number(req.params.userId)) throw new Error('noSuchRoute') // Catch malformed routes
    StatModel.getDailyQuestionSuccessRate(req.params.userId)
    .then(response => res.status(200).json({ Stats: response }))
    .catch(next)
  }

}

module.exports = StatsController
