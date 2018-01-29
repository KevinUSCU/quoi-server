const Model = require('./default.model')('questions') //questions is the table name
const db = require('../db/knex')

class QuestionModel extends Model {

  static allDailyQuestions() {
    return db('daily_questions')
    .select('question_id as id', 'date', 'question', 'choices', 'answer', 'explanation', 'infopedia_id', 'image_url', 'edited', 'deleted')
    .join('questions', 'question_id', 'questions.id')
  }

  static allDailyQuestionsForUser(userId) {
    return db('users_daily_questions')
    .where({ user_id: userId })
    .select('question_id as id', 'date', 'question', 'choices', 'answer', 'explanation', 'infopedia_id', 'image_url', 'edited', 'deleted', 'got_correct')
    .join('daily_questions', 'daily_question_id', 'daily_questions.id')
    .join('questions', 'question_id', 'questions.id')
  }

  static randomNewQuestionOfTheDay(date) {
    return db('questions')
    .where({ used: false, deleted: false }) // We keep deleted questions in db, but don't use them in the question queue
    .then(questions => {
      if (questions.length === 0) return QuestionModel.resetQuestions() // Once all questions have been used once, we start over
      else return questions
    })
    .then(questions => {
      const randomIndex = Math.floor(Math.random() * questions.length)
      const question = questions[randomIndex]
      super.update(question.id, { used: true })
      // Add question to list of daily questions
      return db('daily_questions')
      .insert({ date, question_id: question.id })
      .then(() => question)
    })
  }

  static removeInfoLinks(infopediaId) {
    return db('questions')
    .where({ infopedia_id: infopediaId })
    .update({ infopedia_id: null })
  }

  static resetQuestions() {
    return db('questions')
    .where({ used: true })
    .update({ used: false })
    .returning('*')
  }

}

module.exports = QuestionModel
