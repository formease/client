const express = require('express')
const router = express.Router()
const methods = require('../middleware/method')
const discordMessage = require('../middleware/discord')

router.post('/f/:userid/:formid', methods(['POST']), (req, res) => {
  const userId = req.params.userid
  const formId = req.params.formid
  if (!userId || !formId) {
    res.status(400).send('Bad request')
  }
  res.render('submit')
  discordMessage(req.body).then(() => {
    console.log('Message sent')
  })
}
)

module.exports = router
