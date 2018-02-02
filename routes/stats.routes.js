const express = require('express')
const router = express.Router()
const { AuthController, StatsController } = require(`../controllers`)

router.get('/dashboardstatus/:userId', AuthController.matchesThisUserOrAdmin, StatsController.dashboardStatusForUser)
router.get('/dailyquestionsuccessrate/:userId', AuthController.matchesThisUserOrAdmin, StatsController.dailyQuestionSuccessRateForUser)

module.exports = router
