const express = require('express')
const router = express.Router()
const { StatsController } = require(`../controllers`)

router.get('/dashboardstatus/:userId', StatsController.dashboardStatusForUser)

module.exports = router
