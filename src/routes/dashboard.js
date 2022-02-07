const express = require('express')
const router = express.Router()
const methods = require('../middleware/method')

router.get('/dashboard', methods(['GET']), (req, res) => {
  res.render('dashboard')
}
)

module.exports = router
