const esbuild = require('esbuild')
const Logger = require('./src/lib/logger')
const fs = require('fs')

const logger = new Logger('FormEase', true, true)

const files = fs.readdirSync('./src/public/js/')
for (const file of files) {
  if (file.endsWith('.js')) {
    esbuild.build({
      entryPoints: [`./src/public/js/${file}`],
      outfile: `./src/public/dist/${file}`,
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
        logger.info(`Done | ${file} : ${JSON.stringify(d, null, 1)}`)
      })
  }
}
