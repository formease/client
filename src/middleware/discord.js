const fetch = require('node-fetch')
require('dotenv').config()
const Logger = require('../lib/logger')
const logger = new Logger('discord-status', true, true)

// send message through discord webhook
const discordMessage = async (message) => {
  const params = {
    username: 'FormEase',
    avatar_url: '',
    content: `***New Response***\n${JSON.stringify(message)}`
  }
  fetch(
    process.env.DISCORD_WEBHOOK,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(params)
    }
  ).catch((error) => {
    logger.error(error)
  })
}

module.exports = discordMessage
