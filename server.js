require('dotenv').config()
require('elastic-apm-node').start({
  // Overwrite service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: process.env.APP_NAME || 'mydata-cv api',

  // Use if APM Server requires a token
  secretToken: '',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: process.env.APM_SERVER || 'http://localhost:8200',

  captureBody: (process.env.NODE_ENV !== 'production')
    ? 'errors'
    : 'off'
})
const operator = require('./api/adapters/operator')

const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = require('./api/app')

app.prepare().then(() => {
  server.get('*', (req, res) => {
    handle(req, res)
  })
  server.listen(process.env.PORT || 4000)
  operator.connect()
})
