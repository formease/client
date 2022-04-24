import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import readline from 'readline'
import { google } from 'googleapis'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class GoogleDriveProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
    const TOKEN_PATH = './token.json'
    fs.readFile('./credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err)
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(JSON.parse(content as unknown as string), listFiles)
    })

    function authorize(credentials, callback) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { client_secret, client_id, redirect_uris } = credentials.installed
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback)
        oAuth2Client.setCredentials(JSON.parse(token as unknown as string))
        callback(oAuth2Client)
      })
    }
    function getAccessToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      })
      console.log('Authorize this app by visiting this url:', authUrl)
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close()
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error retrieving access token', err)
          oAuth2Client.setCredentials(token)
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err)
            console.log('Token stored to', TOKEN_PATH)
          })
          callback(oAuth2Client)
        })
      })
    }
    function listFiles(auth) {
      const drive = google.drive({ version: 'v3', auth })
      drive.files.list(
        {
          pageSize: 10,
          fields: 'nextPageToken, files(id, name)',
        },
        (err, res) => {
          if (err) return console.log('The API returned an error: ' + err)
          const files = res?.data.files
          if (files?.length) {
            console.log('Files:')
            files.map((file) => {
              console.log(`${file.name} (${file.id})`)
            })
          } else {
            console.log('No files found.')
          }
        }
      )
    }
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
