const express = require('express')
const router = express.Router()
const { StatsController } = require(`../controllers`)

router.get('/dashboardstatus/:userId', StatsController.dashboardStatusForUser)
router.get('/dailyQuestionSuccessRateForUser/:userId', StatsController.dailyQuestionSuccessRateForUser)

module.exports = router
