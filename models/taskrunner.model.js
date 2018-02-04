const fs = require('fs')
const moment = require('moment');
const { DailyQuestionModel, QuestionModel, TipModel } = require('./')

class TaskrunnerModel {

  constructor(stateFile) {
    const previousState = JSON.parse(fs.readFileSync(stateFile, 'utf-8'))
    this.date = previousState.date
    this.tipOfTheDay = previousState.tipOfTheDay
    this.questionOfTheDay = previousState.questionOfTheDay
    this.taskTimer = null
    this.stateFile = stateFile
  }

  start() {
    this._firstRun()
    this.taskTimer = setInterval(() => this._update(), 2000)
  }

  stop() {
    clearInterval(this.taskTimer)
  }

  _firstRun() {
    // Check for instance where reseeding has occurred and saved state is out of sync with database
    // If we are in sync, there should be a match for this.date in the daily_question table
    DailyQuestionModel.findByDate(moment(this.date).toJSON())
    .then(dailyQuestion => {
      if (!dailyQuestion) { // Out of sync; force update by rewinding day such that next update will refresh
        this.date = moment().subtract(2, 'days').utcOffset("-08:00").toJSON()
      }
      return
    })
  }

  _update() {
    const currentDate = moment().utcOffset("-08:00").toJSON()
    // Compare previous date to current date in local server time, using only the date portion; if true, generate new daily data
    if (moment(currentDate).utcOffset("-08:00").format('YYYYMMDD') > moment(this.date).utcOffset("-08:00").format('YYYYMMDD')) {
      console.log('Server has updated itself with new daily data.')
      this.date = currentDate
      const promises = [ TipModel.randomNewTipOfTheDay(), QuestionModel.randomNewQuestionOfTheDay(currentDate) ]
      Promise.all(promises)
      .then(results => {
        this.tipOfTheDay = results[0]
        const { id, question, choices, answer, explanation, infopedia_id, image_url, deleted } = results[1]
        this.questionOfTheDay = { id, question, choices, answer, explanation, infopedia_id, image_url, deleted }
        fs.writeFileSync(this.stateFile, JSON.stringify({ date: this.date, tipOfTheDay: this.tipOfTheDay, questionOfTheDay: this.questionOfTheDay }))
      })
    }
  }
}

module.exports = TaskrunnerModel
