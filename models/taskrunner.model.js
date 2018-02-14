const fs = require('fs')
const moment = require('moment')
const { DailyQuestionModel, QuestionModel, TipModel } = require('./')

class TaskrunnerModel {

  constructor() {
    this.date = moment().utcOffset("-08:00").toJSON()
    this.tipOfTheDay = ""
    this.questionOfTheDay = null
    this.taskTimer = null
  }

  start() {
    this._firstRun()
    this.taskTimer = setInterval(() => this._update(), 2000)
  }

  stop() {
    clearInterval(this.taskTimer)
  }

  _firstRun() {
    // Load a new tip, and find the newest question
    const promises = [ TipModel.randomNewTipOfTheDay(), DailyQuestionModel.getQuestionWithNewestDate() ]
    Promise.all(promises)
    .then(results => {
      this.tipOfTheDay = results[0]
      // Check for existing daily question
      if (results[1]) { 
        // Check that date matches
        let currentDate = moment(this.date).utcOffset("-08:00").format('YYYYMMDD')
        let retrievedDate = moment(results[1].date).utcOffset("-08:00").format('YYYYMMDD')
        if (currentDate === retrievedDate) { // Match
          this.date = results[1].date // We need to set our date to the date of the question so we can find it later
          return results[1] // Retrieve existing question
        }
      }
      // If nothing, or does not match, generate new question
      console.log('Server has updated itself with new daily data.')
      return QuestionModel.randomNewQuestionOfTheDay(this.date)
    })
    .then(result => {
      const { id, question, choices, answer, explanation, infopedia_id, image_url, deleted } = result
      this.questionOfTheDay = { id, question, choices, answer, explanation, infopedia_id, image_url, deleted }
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
        return
      })
    }
  }
}

module.exports = TaskrunnerModel
