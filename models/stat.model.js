const db = require('../db/knex')
const UserDailyQuestionModel = require('./user-daily-question.model')
const moment = require('moment')

class StatModel {

  static getDashboardStatusForUser(userId) {
    return UserDailyQuestionModel.getAllDailyQuestionsForUser(userId)
    .then(questions => {
      // We build an array to hand back to the client. The client views status for the current Sun - Sat week.
      let statusMap = []
      for (let i = 0; i < 7; i++) {
        let date = moment().day(i) // Generates the date for the day of the week provided by i
        let filtered = questions.filter(question => { // Look for daily questions answered on day i
          return date.format('YYYYMMDD') === moment(question.date).format('YYYYMMDD')
        })
        let status = null
        if (filtered[0]) status = filtered[0].got_correct
        statusMap.push({ day: date.date(), status })
      }
      return statusMap
    })
  }

}

module.exports = StatModel
