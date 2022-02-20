const express = require('express')
const router = express.Router()
const methods = require('../middleware/method')

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: <Already applied>
router.all('/dashboard', methods(['GET']), (req, res) => {
  res.render('dashboard')
}
)

module.exports = router
