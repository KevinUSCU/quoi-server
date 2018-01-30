class DateController {

  static getServerDate (req, res, next) {
    res.status(200).json({ Date: TASKRUNNER.date })
  }

}

module.exports = DateController
