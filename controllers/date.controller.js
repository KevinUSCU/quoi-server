const moment = require('moment')

class DateController {

  static getServerDayOfTheWeek (req, res, next) {
    const day = moment(TASKRUNNER.date).day()
    res.status(200).json({ Day: day })
  }

}

module.exports = DateController
