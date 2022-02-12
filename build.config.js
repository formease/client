const esbuild = require('esbuild')
const Logger = require('./src/lib/logger')
const fs = require('fs')

const logger = new Logger('FormEase', true, true)

const builder = async () => {
  const files = fs.readdirSync('./src/public/js/')
  for (const file of files) {
    if (file.endsWith('.js')) {
      esbuild.build({
        entryPoints: [`./src/public/js/${file}`],
        outfile: `./src/public/dist/${file}`,
        legalComments: 'none',
        minify: true,
        bundle: true,
        platform: 'browser',
        sourcemap: true,
        define: {
          'process.env.NODE_ENV': '"production"'
        }
      })
        .catch((error) => {
          logger.error(error)
          process.exit(1)
        })
        .then((d) => {
          logger.success(`Done - ${file}`)
        })
    }
  }
}

const checker = async () => {
  logger.info('Checking for updates...')
  const source = fs.readdirSync('./src/public/dist/')
  const target = fs.readdirSync('./src/public/js/')
  const diff = source.filter((file) => !target.includes(file) && file.endsWith('.js') && file !== 'prism.js')
  if (diff.length > 0) {
    for (const file of diff) {
      fs.unlinkSync(`./src/public/dist/${file}`)
      fs.unlinkSync(`./src/public/dist/${file}.map`)
      logger.warn(`Deleted ${file}`)
    }
  }
}

(async () => {
  await checker()
  await builder()
})()
