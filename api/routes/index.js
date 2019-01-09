const { Router } = require('express')
const router = Router()
const { getConsent } = require('../services/db')
const { createRequest } = require('../services/consents')

module.exports = operator => {
  router.get('/', (req, res, next) => {
    res.send(require(`${process.cwd()}/package.json`))
  })

  router.post('/auth', async (req, res, next) => {
    const pendingRequest = await operator.consents.request(createRequest())
    res.send(pendingRequest)
  })

  // TODO: This is not very secure. Anyone with the id can race the GET-request and steal the secret token.
  // Instead, we should probably associate the consent request with a session and then log in that session once it's approved.
  router.get('/approved/:id', async (req, res, next) => {
    const result = getConsent(req.params.id)
    if (result) {
      res.send({ accessToken: result.id }) // TODO: Use actual accessToken instead of consentId from Operator...?
    } else {
      res.sendStatus(404)
    }
  })

  router.get('/data', async (req, res, next) => {
    const consentId = req.headers.authorization.split('Bearer ')[1]

    if (!consentId) {
      return next(Error('Invalid authorization header'))
    }
    const data = await operator.data.read(consentId, '/')
    res.send(data)
  })
  return router
}
