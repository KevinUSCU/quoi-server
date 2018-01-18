/*--- Required Libraries ---*/
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const processErrorMessage = require('./models/error.model')

/*--- Initialize Server ---*/
require('dotenv').load() //get config options from .env
const app = express()
if (process.env.NODE_ENV !== 'development') app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(morgan('dev'))
//set Cors options
if (environment === 'production') {
  var corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }  
} else {
  var corsOptions = {
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
}
app.use(cors(corsOptions))

/*--- Routes ---*/
// const {
//   AuthRouter,
//   UsersRouter
// } = require('./routes')
// app.use('/api/auth', AuthRouter)
// app.use('/api/users', UsersRouter)


/*--- Error handlers ---*/
app.use((req, res) => {
  const status = 404;
  const message = `Could not ${req.method} ${req.path}`
  res.status(status).json({ status, message })
})

app.use((err, _req, res, _next) => {
  //parse error message
  err = processErrorMessage(err)
  //errors dispatched to client are also displayed on server console if following env variable is 'true'
  if (process.env.PRINT_CLIENT_ERRORS_ON_SERVER) console.error(err)
  //dispatch error to client
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!'
  res.status(status).json({ status, message })
})

module.exports = app