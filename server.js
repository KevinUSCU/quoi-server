/*--- Load Environment Options ---*/
const environment = process.env.NODE_ENV //NODE_ENV set in package.json scripts
require('dotenv').load() //load additional config options from .env

/*--- Required Libraries ---*/
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const processErrorMessage = require('./models/error.model')

/*--- Initialize Server ---*/
const app = express()
if (environment !== 'development') app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(morgan('dev'))
//set Cors options
const corsOrigin = environment === 'production' ? process.env.CORS_ORIGIN : 'http://127.0.0.1:8080'
const corsOptions = { origin: corsOrigin, optionsSuccessStatus: 200 }
app.use(cors(corsOptions))

/*--- Routes ---*/
const {
  AuthRouter,
  DateRouter,
  InfopediaRouter,
  QuestionsRouter,
  TipsRouter,
  UsersRouter
} = require('./routes')
app.use('/api/auth', AuthRouter)
app.use('/api/date', DateRouter)
app.use('/api/infopedia', InfopediaRouter)
app.use('/api/questions', QuestionsRouter)
app.use('/api/tips', TipsRouter)
app.use('/api/users', UsersRouter)


/*--- Error handlers ---*/
app.use((req, res) => {
  const status = 404;
  const message = `Could not ${req.method} at ${req.path}`
  res.status(status).json({ status, message })
})

app.use((err, _req, res, _next) => {
  //parse error message
  err = processErrorMessage(err)
  //errors dispatched to client are also displayed on server console if following env variable is 'true'
  if (process.env.PRINT_CLIENT_ERRORS_ON_SERVER) console.error('Error dispatched to client:', err)
  //dispatch error to client
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!'
  res.status(status).json({ status, message })
})

/*--- Server Tasks ---*/
const stateFile = path.join(__dirname, 'db', 'server-state.json')
const TaskrunnerModel = require('./models/taskrunner.model')
global.TASKRUNNER = new TaskrunnerModel(stateFile)
TASKRUNNER.start()

module.exports = app