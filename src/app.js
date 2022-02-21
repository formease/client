const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const path = require('path')
const rateLimit = require('express-rate-limit')
const Logger = require('./lib/logger')
// deepcode ignore UseCsurfForExpress: <No usage of cookies currently>
const app = express()
const logger = new Logger('FormEase', true, true)

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'connect-src': ["'self'", 'https://*.googleapis.com', 'https://*.google.com', 'https://forms-server.firebaseapp.com/'],
      'script-src': ["'self'", 'https://*.googleapis.com', 'https://*.google.com', 'https://forms-server.firebaseapp.com/'],
      'frame-src': ["'self'", 'https://*.googleapis.com', 'https://*.google.com', 'https://forms-server.firebaseapp.com/'],
      'img-src': ["'self'", 'https://avatars.githubusercontent.com/', 'https://lh3.googleusercontent.com/']
    }
  }
}))
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use((req, res, next) => {
  res.header('Cross-Origin-Embedder-Policy', 'credentialles')
  res.header('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
})
app.use(compression())
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false
})
app.use(rateLimiter)
app.use('/', [require('./routes/landing'), require('./routes/auth'), require('./routes/dashboard'), require('./routes/discord'), require('./routes/create')])
app.set('trust proxy', 1)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'pages'))

/* app.get('*', (req, res, next) => {
  const err = new Error()
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  if (err.status === 404) {
    const data = {
      title: '404 Not Found',
      content: 'Oops, page not found!'
    }
    res.render('404', {
      data: data
    })
  } else {
    return next()
  }
}) */

app.listen(process.env.PORT || 3000, function () {
  logger.info(
    `Express server listening on port ${this.address().port} in ${app.settings.env} mode`
  )
})
process.on('uncaughtException', (err) => {
  logger.error(err && err.stack)
})
