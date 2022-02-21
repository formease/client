const express = require('express')
const router = express.Router()
const methods = require('../middleware/method')

router.all('/createForm', methods(['POST']), (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

module.exports = router
