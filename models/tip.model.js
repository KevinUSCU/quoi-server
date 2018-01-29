const Model = require('./default.model')('tips') //tips is the table name
const db = require('../db/knex')

class TipModel extends Model {

  static randomNewTipOfTheDay() {
    return db('tips')
    .where({ used: false })
    .then(tips => {
      if (tips.length === 0) return TipModel.resetTips()
      else return tips
    })
    .then(tips => {
      const randomIndex = Math.floor(Math.random() * tips.length)
      const tip = tips[randomIndex]
      super.update(tip.id, { used: true })
      return tip.tip
    })
  }

  static resetTips() {
    return db('tips')
    .where({ used: true })
    .update({ used: false })
    .returning('*')
  }

}

module.exports = TipModel
