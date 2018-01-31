const fs = require('fs')
const moment = require('moment');
const { QuestionModel, TipModel } = require('./')

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
    this.taskTimer = setInterval(() => this._update(), 2000)
  }

  stop() {
    clearInterval(this.taskTimer)
  }

  _update() {
    const currentDate = moment().format('YYYYMMDD') // this will allow for a comparison in server local time
    if (currentDate > this.date) { // Generate new daily data
      console.log('Server has updated itself with new daily data.')
      this.date = currentDate
      const promises = [ TipModel.randomNewTipOfTheDay(), QuestionModel.randomNewQuestionOfTheDay(moment().toJSON()) ]
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
