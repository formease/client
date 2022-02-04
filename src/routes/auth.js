const express = require('express')
const router = express.Router()
const methods = require('../middleware/method')

router.get('/auth', methods(['GET']), (req, res) => {
  res.render('auth')
}
)

module.exports = router
