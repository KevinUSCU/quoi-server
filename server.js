/*--- Load Environment Options ---*/
const environment = process.env.NODE_ENV // NODE_ENV set in package.json scripts
require('dotenv').load() // Load additional config options from .env

/*--- Required Libraries ---*/
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const processErrorMessage = require('./models/error.model')

/*--- Initialize Server ---*/
const app = express()
if (environment !== 'development') app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(morgan('dev'))
// Set Cors options
const corsOrigin = environment === 'production' ? process.env.CORS_ORIGIN : 'http://127.0.0.1:8080'
const corsOptions = { origin: corsOrigin, optionsSuccessStatus: 200 }
app.use(cors(corsOptions))

/*--- Routes ---*/
const {
  AuthRouter,
  InfopediaRouter,
  QuestionsRouter,
  StatsRouter,
  TipsRouter,
  UsersRouter
} = require('./routes')
app.use('/api/auth', AuthRouter)
app.use('/api/infopedia', InfopediaRouter)
app.use('/api/questions', QuestionsRouter)
app.use('/api/stats', StatsRouter)
app.use('/api/tips', TipsRouter)
app.use('/api/users', UsersRouter)

/*--- Error handlers ---*/
app.use((req, res) => {
  const status = 404;
  const message = `Could not ${req.method} at ${req.path}`
  res.status(status).json({ status, message })
})

app.use((err, _req, res, _next) => {
  // Parse error message
  err = processErrorMessage(err)
  // Errors dispatched to client are also displayed on server console if following env variable is 'true'
  if (environment !== 'test' && process.env.PRINT_CLIENT_ERRORS_ON_SERVER) console.error('Error dispatched to client:', err)
  // Dispatch error to client
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!'
  res.status(status).json({ status, message })
})

/*--- Server Tasks ---*/
if (environment !== 'test') {
  const TaskrunnerModel = require('./models/taskrunner.model')
  global.TASKRUNNER = new TaskrunnerModel()
  TASKRUNNER.start()
}

module.exports = app