const express = require('express')
const router = express.Router()
const methods = require('../middleware/method')

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: <Already applied>
router.all('/', methods(['GET']), (req, res) => {
  res.render('index')
}
)

module.exports = router
