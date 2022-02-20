const express = require('express')
const router = express.Router()
const methods = require('../middleware/method')
const discordMessage = require('../middleware/discord')

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: <Already applied>
router.all('/f/:userid/:formid', methods(['POST']), (req, res) => {
  const userId = req.params.userid
  const formId = req.params.formid
  if (!userId || !formId) {
    res.status(400).send('Bad request')
  }
  res.render('submit')
  try {
    discordMessage(req.body).catch((err) => {
      console.log(err)
    })
  } catch {
    console.log('Message not sent')
  }
}
)

module.exports = router
