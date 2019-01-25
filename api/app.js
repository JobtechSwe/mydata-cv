const express = require('express')
const routes = require('./routes')
const { saveConsent, saveConsentRequest } = require('./services/db')
const operator = require('./adapters/operator')

operator.events.on('CONSENT_APPROVED', consent => {
  saveConsent(consent)
  saveConsentRequest(consent)
})

const app = express()
app.use(express.json())
app.use('/api', routes(operator))

// Operator routes
app.use(operator.routes)

module.exports = app
