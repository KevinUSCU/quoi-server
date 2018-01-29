const fs = require('fs')
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
    const currentDate = new Date().toISOString().substr(0,10)
    if (currentDate > this.date) { //generate new daily data
      console.log('Server has updated itself with new daily data.')
      this.date = currentDate
      const promises = [ TipModel.randomNewTipOfTheDay(), QuestionModel.randomNewQuestionOfTheDay(currentDate) ]
      Promise.all(promises)
      .then(results => {
        this.tipOfTheDay = results[0]
        const { id, question, choices, answer, explanation, infopedia_id, image_url, edited, deleted } = results[1]
        this.questionOfTheDay = { id, question, choices, answer, explanation, infopedia_id, image_url, edited, deleted }
        fs.writeFileSync(this.stateFile, JSON.stringify({ date: this.date, tipOfTheDay: this.tipOfTheDay, questionOfTheDay: this.questionOfTheDay }))
      })
    }
  }
}

module.exports = TaskrunnerModel
