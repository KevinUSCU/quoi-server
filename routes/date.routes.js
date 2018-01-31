const express = require('express')
const router = express.Router()
const { DateController } = require(`../controllers`)

router.get('/', DateController.getServerDayOfTheWeek)

module.exports = router