const db = require('../db/knex')
const UserDailyQuestionModel = require('./user-daily-question.model')
const moment = require('moment')

class StatModel {

  static getDashboardStatusForUser(userId) {
    return UserDailyQuestionModel.getAllDailyQuestionsForUser(userId)
    .then(questions => {
      // We build an object to hand back to the client. The client views status for the current Sun - Sat week.
      const statusMap = []
      var todayCompleted = false
      const day = moment(TASKRUNNER.date).utcOffset("-08:00").day()
      console.log(day)
      for (let i = 0; i < 7; i++) {
        let date = moment().utcOffset("-08:00").day(i) // Generates the date for the day of the week provided by i
        let filtered = questions.filter(question => { // Look for daily questions answered on day i
          return date.format('YYYYMMDD') === moment(question.date).utcOffset("-08:00").format('YYYYMMDD')
        })
        let status = null
        if (filtered[0]) status = filtered[0].got_correct
        let today = false
        if (day === i) {
          today = true
          if (status !== null) todayCompleted = true
        }
        statusMap.push({ day: date.date(), status, today })
      }
      const dashboardObject = { map: statusMap, todayCompleted }
      return dashboardObject
    })
  }

}

module.exports = StatModel
