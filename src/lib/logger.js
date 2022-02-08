const format = require('date-fns/format')
const color = require('colors')

class Logger {
  constructor (header, flags, color) {
    this.header = header || 'logger'
    this.flags = flags || false
    this.color = color
  }

  error (message) {
    const headerPartial = `[${this.header} - ${format(Date.now(), 'hh:mm:ss aa')}] :`
    const header = `${this.color ? color.grey(headerPartial) : headerPartial}`
    const flag = `${this.flags ? this.color ? color.bgBrightRed(color.black('ERROR')) : 'ERROR' : ''}`
    const log = `${this.color ? color.brightRed(message) : message}`
    console.log(`${header} ${flag} | ${log}`)
  }

  info (message) {
    const headerPartial = `[${this.header} - ${format(Date.now(), 'hh:mm:ss aa')}] :`
    const header = `${this.color ? color.grey(headerPartial) : headerPartial}`
    const flag = `${this.flags ? this.color ? color.bgBrightBlue(color.black('INFO')) : 'INFO' : ''}`
    const log = `${this.color ? color.brightCyan(message) : message}`
    console.log(`${header} ${flag} | ${log}`)
  }

  warn (message) {
    const headerPartial = `[${this.header} - ${format(Date.now(), 'hh:mm:ss aa')}] :`
    const header = `${this.color ? color.grey(headerPartial) : headerPartial}`
    const flag = `${this.flags ? this.color ? color.bgBrightYellow(color.black('WARN')) : 'WARN' : ''}`
    const log = `${this.color ? color.brightYellow(message) : message}`
    console.log(`${header} ${flag} | ${log}`)
  }

  success (message) {
    const headerPartial = `[${this.header} - ${format(Date.now(), 'hh:mm:ss aa')}] :`
    const header = `${this.color ? color.grey(headerPartial) : headerPartial}`
    const flag = `${this.flags ? this.color ? color.bgBrightGreen(color.black('SUCCESS')) : 'SUCCESS' : ''}`
    const log = `${this.color ? color.brightGreen(message) : message}`
    console.log(`${header} ${flag} | ${log}`)
  }
}

module.exports = Logger
