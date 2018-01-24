const fs = require('fs')
const { TipModel } = require('./')

class TaskrunnerModel {

  constructor(stateFile) {
    const previousState = JSON.parse(fs.readFileSync(stateFile, 'utf-8'))
    this.date = previousState.date
    this.tipOfTheDay = previousState.tipOfTheDay
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
      TipModel.randomNewTipOfTheDay()
      .then(tip => {
        this.tipOfTheDay = tip
        fs.writeFileSync(this.stateFile, JSON.stringify({ date: this.date, tipOfTheDay: this.tipOfTheDay }))
      })

    // update daily question

    }
  }
}

module.exports = TaskrunnerModel
