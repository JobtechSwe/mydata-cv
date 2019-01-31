const { Router } = require('express')
const router = Router()
const { getConsentRequest } = require('../services/db')
const { createDefaultRequest, domain, area } = require('../services/consents')

module.exports = operator => {
  router.post('/auth', async (req, res, next) => {
    const request = createDefaultRequest(3600 * 24 * 31)
    try {
      const pendingRequest = await operator.consents.request(request)
      res.send(pendingRequest)
    } catch (error) {
      console.error('Error when doing consent request', error)
      next(error)
    }
  })

  // TODO: This is not very secure. Anyone with the id can race the GET-request and steal the secret token.
  // Instead, we should probably associate the consent request with a session and then log in that session once it's approved.
  router.get('/approved/:id', async (req, res, next) => {
    const result = getConsentRequest(req.params.id)
    if (result) {
      res.send({ accessToken: result.accessToken })
    } else {
      res.sendStatus(404)
    }
  })

  router.get('/data', async (req, res, next) => {
    const accessToken = req.headers.authorization.split('Bearer ')[1]
    if (!accessToken) {
      return next(Error('Invalid authorization header'))
    }

    try {
      const data = await operator.data.auth(accessToken).read({ domain, area })
      const json = JSON.parse(data[domain][area]) || {}

      res.send(json)
    } catch (error) {
      next(error)
    }
  })

  router.post('/data', async (req, res, next) => {
    const accessToken = req.headers.authorization.split('Bearer ')[1]
    if (!accessToken) {
      return next(Error('Invalid authorization header'))
    }

    try {
      const data = req.body
      await operator.data.auth(accessToken).write({ domain, area, data })

      res.sendStatus(201)
    } catch (error) {
      next(error)
    }
  })

  return router
}
